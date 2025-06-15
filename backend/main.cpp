#include <crow.h>
#include <dotenv.h>
#include <json.hpp>
#include <spdlog/spdlog.h>
#include <uuid.h>
#include <jwt-cpp/jwt.h>
#include <argon2.h>
#include <pqxx/pqxx>
#include <cstdlib>
#include <cstring> 
#include <random>

int main()
{
    dotenv::init();

    const char *db_name = std::getenv("DB_NAME");
    const char *db_user = std::getenv("DB_USER");
    const char *db_pass = std::getenv("DB_PASS");
    const char *db_host = std::getenv("DB_HOST");
    const char *secret = std::getenv("SECRET_KEY");

    if (!db_name || !db_user || !db_pass || !db_host || !secret)
    {
        spdlog::error("One or more environment variables are missing!");
        return 1;
    }

    std::string conn_string = "dbname=" + std::string(db_name) +
                              " user=" + db_user +
                              " password=" + db_pass +
                              " host=" + db_host;

    spdlog::info("backend starting...");

    try
    {
        pqxx::connection c(conn_string);
        pqxx::work txn(c);
        pqxx::result r = txn.exec("SELECT version();");
        spdlog::info("PostgreSQL version: {}", r[0][0].c_str());
    }
    catch (const std::exception &e)
    {
        std::ofstream ofs("db_error.log", std::ios::binary);
        ofs << "DB connection error: " << e.what() << std::endl;
        ofs.close();

        spdlog::error("DB connection error: {}", e.what());
    }

    std::random_device rd;
    std::mt19937 rng(rd());          
    uuids::uuid_random_generator gen{rng}; 
    auto id = gen();
    spdlog::info("Generated UUID: {}", uuids::to_string(id));

    const char *password = "secure123";
    char hash[128];
    const uint8_t *salt = reinterpret_cast<const uint8_t *>("somesalt");
    int result = argon2i_hash_raw(2, 1 << 16, 1,
                                  password, strlen(password),
                                  salt, 8,
                                  hash, 32);
    if (result != ARGON2_OK)
    {
        spdlog::error("Argon2 hashing failed: {}", argon2_error_message(result));
    }
    else
    {
        spdlog::info("Argon2 hash (first byte): {}", static_cast<int>(hash[0]));
    }

    try
    {
        auto token = jwt::create()
                         .set_issuer("teamflow")
                         .set_type("JWS")
                         .set_payload_claim("uid", jwt::claim(std::string("user_id_example")))
                         .sign(jwt::algorithm::hs256{secret});
        spdlog::info("JWT token: {}", token);
    }
    catch (const std::exception &e)
    {
        spdlog::error("JWT generation failed: {}", e.what());
    }

    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([]
                         { return "Hello!"; });

    try
    {
        app.port(18080).multithreaded().run();
    }
    catch (const std::exception &e)
    {
        spdlog::error("Crow server error: {}", e.what());
    }

    std::cout << "Press Enter to exit..." << std::endl;
    std::cin.get();

    return 0;
}

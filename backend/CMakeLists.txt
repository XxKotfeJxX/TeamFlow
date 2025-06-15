cmake_minimum_required(VERSION 3.16)
project(TeamFlowBackend)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(LIB_DIR "${CMAKE_SOURCE_DIR}/Libraries_DONT_PUSH")
set(POSTGRESQL_LIB_DIR "C:/Program Files/PostgreSQL/17/lib")

add_executable(teamflow main.cpp)

target_compile_definitions(teamflow PRIVATE _WIN32_WINNT=0x0A00)

target_include_directories(teamflow PRIVATE
    ${LIB_DIR}/crow/include
    ${LIB_DIR}/dotenv-cpp/include
    ${LIB_DIR}/libpqxx/include
    ${LIB_DIR}/libpqxx/build/include
    ${LIB_DIR}/phc-winner-argon2-master/include
    ${LIB_DIR}/nlohmann
    ${LIB_DIR}/jwt-cpp/include
    ${LIB_DIR}/stduuid/include
    ${LIB_DIR}/spdlog/include
    ${LIB_DIR}/asio/include
    ${LIB_DIR}/openssl/include
    ${PROJECT_SOURCE_DIR}/include
)

target_link_directories(teamflow PRIVATE
    ${LIB_DIR}/libpqxx/build/src/Debug
    ${LIB_DIR}/phc-winner-argon2-master/build-vs/argon2/x64/Debug
    ${LIB_DIR}/openssl/lib/VC/x64/MDd
    "${POSTGRESQL_LIB_DIR}"
)

target_link_libraries(teamflow
    PRIVATE
    pqxx.lib
    libpq.lib
    libssl.lib
    argon2.lib
    libcrypto.lib
)

if(MSVC)
    message(STATUS "MSVC runtime flags: ${CMAKE_CXX_FLAGS}")
    target_compile_options(teamflow PRIVATE /utf-8 /W4 /wd4244 /wd4267 /D_CRT_SECURE_NO_WARNINGS)
endif()

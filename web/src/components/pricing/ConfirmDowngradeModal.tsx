import { Button } from "../ui/Button";

interface Props {
  plan: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDowngradeModal({
  plan,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Підтвердження</h2>
        <p className="text-gray-700 mb-6">
          Ваш поточний тариф має більше можливостей. Ви впевнені, що хочете
          перейти на <b>{plan}</b>?
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            onClick={onCancel}
            style={{ border: "none" }}
          >
            Ні
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
            style={{ border: "none" }}
          >
            Так
          </Button>
        </div>
      </div>
    </div>
  );
}

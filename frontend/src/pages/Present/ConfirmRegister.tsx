import { Calendar, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';

const ConfirmRegister = ({
  handleConfirmSubmit,
  showConfirmDialog,
  setShowConfirmDialog,
  trialSlot,
  officialSlots,
}: {
  handleConfirmSubmit: () => void;
  showConfirmDialog: boolean;
  setShowConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>;
  trialSlot: string;
  officialSlots: string[];
}) => {
  return (
    <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận đăng ký thời gian thuyết trình</AlertDialogTitle>
          <AlertDialogDescription>Kiểm tra lại thông tin đăng ký của bạn trước khi xác nhận.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 pb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <h4 className="font-semibold text-gray-900">Thuyết trình thử</h4>
            </div>
            {trialSlot ? (
              <div className="rounded-md border-1 border-blue-400 bg-blue-50 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-blue-600" />
                  <span className="font-medium text-blue-900">{trialSlot.split('|')[0]}</span>
                  <span className="text-blue-600"> - </span>
                  <span className="text-blue-800">{trialSlot.split('|')[1]}</span>
                </div>
              </div>
            ) : (
              <div className="">
                <p className="text-sm text-gray-500 italic">Không đăng ký</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-700">Thuyết trình chính thức</h4>
            </div>
            <div className="space-y-2">
              {officialSlots.map((slot) => (
                <div key={slot} className="bg-primary/10 border-primary rounded-md border-1 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-green-600" />
                    <span className="font-medium text-green-900">{slot.split('|')[0]}</span>
                    <span className="text-green-600"> - </span>
                    <span className="text-green-800">{slot.split('|')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Lưu ý:</span> Sau khi xác nhận, thông tin sẽ được gửi đến ban tổ chức. Đảm
              bảo tất cả thành viên có thể tham gia các khung giờ đã chọn.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmSubmit}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmRegister;

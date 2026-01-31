import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
type ApproveMemberProps = {
    value: string;
};
const ApproveMember = ({ value }: ApproveMemberProps) => {
    return (
        <Select defaultValue={value}>
            <SelectTrigger className="w-full max-w-48 bg-white">
                <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    <SelectItem value="WAITING">Chờ xử lý</SelectItem>
                    <SelectItem value="PASSED">Duyệt</SelectItem>
                    <SelectItem value="FAILED">Loại</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ApproveMember;

import Input from '@/shared/ui/Input';

type Props = {
    name: string;
    onChange: (value: string) => void;
}

function GreetInput({ name, onChange }: Props) {
    return (
        <Input
            value={name}
            onChange={(e) => onChange(e.target.value)}
            placeholder="이름을 입력하세요"
        />
    );
}

export default GreetInput;
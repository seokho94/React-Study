type Props = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: Props) {
    return (
        <input
            {...props}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
    )
}

export default Input;
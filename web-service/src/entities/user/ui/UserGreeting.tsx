type Props = {
	name: string;
}

function UserGreeting({ name }: Props) {
	if(!name) return null;
	return <p style={{ marginTop: '1rem'}}>안녕하세요, {name}님!</p>;
}

export default UserGreeting;
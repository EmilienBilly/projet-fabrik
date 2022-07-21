import Title from "../components/Title";

const Register = () => {
    return (
        <>
            <Title title="Register" />
            <form action="">
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Mot de passe" />
                <input type="text" name="username" placeholder="Nom d'utilisateur" />
                <button></button>
            </form>
        </>
    );
};

export default Register;

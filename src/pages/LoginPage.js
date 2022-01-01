function LoginPage() {
	return (
		<div className="w-full h-full bg-neutral-800 flex items-center justify-center">
			<div className="p-6 bg-neutral-900 rounded-2xl flex flex-col items-center">
				<strong className="text-white text-3xl tracking-[0.5em] font-light">CHRONICLE</strong>
				<input type="password" className="bg-neutral-800 text-neutral-300 text-center text-3xl tracking-widest rounded-xl mt-20 p-2"></input>
				<button className="bg-neutral-800 text-neutral-300 rounded-xl mt-5 py-2 px-6 tracking-widest">OPEN</button>
			</div>
		</div>
	);
}

export default LoginPage;

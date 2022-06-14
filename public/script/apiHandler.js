const instance = axios.create({
	baseUrl: "http://localhost:5005",
})

instance.login = async (userInfos) => {
	try {
		const { data } = await instance.post("/auth/login", userInfos)
		localStorage.setItem("authToken", data.authToken)
	} catch (error) {
		console.log(error.message)
	}
}

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken")
	config.headers.Authorization = token ? `Bearer ${token}` : ""
	return config
})

export default instance
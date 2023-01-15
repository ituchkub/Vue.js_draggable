<template>
	<div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle auth-main">
				<div class="auth-box">
					<div class="top">
						<img src="../../public/assets/images/logo-white.svg" alt="Lucid">
					</div>
					<div class="card">
						<div class="header">
							<p class="lead">Login to your account</p>
						</div>
						<div class="body">
							<form class="form-auth-small" @submit.prevent="login()">
								<div class="form-group">
									<label for="signin-email" class="control-label sr-only">Email</label>
									<!-- <input type="email" class="form-control" id="signin-email" value=""
										placeholder="Email"> -->
									<b-form-input v-model.trim="InPEmail" placeholder="Email" />
								</div>



								<div class="form-group">
									<label for="signin-password" class="control-label sr-only">Password</label>
									<!-- <input type="password" class="form-control" id="signin-password" value=""
										placeholder="Password"> -->
									<b-form-input v-model.trim="InPPassword" type="password" placeholder="Password" />
								</div>
								<div class="form-group clearfix">
									<label class="fancy-checkbox element-left">
										<input type="checkbox">
										<span>Remember me</span>
									</label>
								</div>
								<button type="submit" class="btn btn-primary btn-lg btn-block">LOGIN</button>
								<div class="bottom">
									<span class="helper-text m-b-10"><i class="fa fa-lock"></i> <a
											href="page-forgot-password.html">Forgot password?</a></span>
									<span>Don't have an account? <a href="page-register.html">Register</a></span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AuthService from "../../service/authService";
import Helper from "../Helper/customHelper";
export default {
	name: "App",
	components: {
	},
	data() {
		return {
			InPEmail: 'Kantathussu@fusionsoft.co.th', InPPassword: ''
		};
	},
	async mounted() {

	}, methods: {

		async login() {
			//console.log("LoGIn")
			if (!Helper.isNullOrEmpty(this.InPEmail)) {
				await AuthService.Login({
					Username: this.InPEmail,
					Email: this.InPEmail
				}).then(resp => {
					console.log(resp)
					if (resp.data.status === true) {
						const getprop = resp.data.body
						let rName = [{ rid: 1, rname: 'Developer' }, { rid: 2, rname: 'Project manager' }]
						var RName = []
						getprop.roleId.split(',').forEach(roleID => {
							rName.forEach(item => {
								if (item.rid == roleID) {
									RName.push(item.rname)
								}
							})
						})
						var tempUser = {
							EmpId: getprop.id,
							Email: getprop.email,
							Fullname: getprop.name + " " + getprop.surename,
							Name: getprop.name,
							Surename: getprop.surename,
							RoleId: getprop.roleId.split(','), //  Get RoleID from last digit 
							RoleName: RName.join(', '),
							Telephone: getprop.telephone,
						}
						sessionStorage.setItem('userInfo', JSON.stringify(tempUser))
						sessionStorage.setItem('token', resp.data.token)
						sessionStorage.setItem('SessionEmpID', tempUser.EmpId)
						sessionStorage.setItem('displayName', tempUser.Fullname)

						sessionStorage.setItem('lgName', tempUser.Name)
						sessionStorage.setItem('lgSurname', tempUser.Surename)

						this.$cookies.set("userInfo", JSON.stringify(tempUser), "5d").set("token", resp.data.token, "5d").set("SessionEmpID", tempUser.EmpId, "5d").set("displayName", tempUser.Fullname, "5d").set("lgName", tempUser.Name, "5d").set("lgSurname", tempUser.Surename, "5d")

						// this.$parent.login = 2
						this.$parent.checkLogin()
					}
				})
			}
		}

	}

}
	;
</script>

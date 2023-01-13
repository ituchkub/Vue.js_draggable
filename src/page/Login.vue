<template>
	<!-- begin login -->
	<div class="login login-with-news-feed">
		<!-- begin news-feed -->
		<div class="news-feed">
			<div class="news-image" style="background-image: url(/assets/img/bg-login-thai-u.jpeg)"></div>
			<div class="news-caption">
				<h4 class="caption-title"><b>THAI UNION</b> I Global Seafood Leader</h4>
				<p>
					CopyRight © 2022 Thai Union Group PCL.
				</p>
			</div>
		</div>
		<!-- end news-feed -->
		<!-- begin right-content -->
		<div class="right-content">
			<!-- begin login-header -->
			<div class="login-header">
				<div class="brand">
					<!-- <span class="logo"></span> <b>Color</b> Admin -->
					<img style="background-color: #fff; width: 15%; height: 15%;" class="m-3"
						src="/assets/img/logo-thai-u.png"> <b>THAI UNION</b>
					<small>Order Entry APPLICATION </small>
				</div>
				<div class="icon">
					<i class="fa fa-sign-in"></i>
				</div>
			</div>
			<!-- end login-header -->
			<!-- begin login-content -->
			<div class="login-content">

				<!-- Login By Email -->
				<!-- <form v-on:submit="loginFsAdmin" method="POST" v-if="LoginMode == 'fsAdmin'">
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text"><i class="fa fa-user"></i></div>
							</div>
							<input text="email" class="form-control form-control-lg" v-model="UserName" placeholder="Username" required/>
						</div>
					</div>

					<button class="btn btn-dark btn-block btn-lg">
						<i class="fa fa-arrow-right"></i> Sign In
					</button>
				</form> -->

				<!-- Login Azure -->
				<!-- <button class="btn btn-dark btn-block" v-if="LoginMode == 'azure'" @click="$parent.loginAzure()">
					<i class="fa fa-arrow-right"></i> Sign In
				</button> -->


				<hr />
				<p class="text-center text-grey-darker">
					&copy; Thai Union Group PCL.
				</p>
			</div>
			<!-- end login-content -->
		</div>
		<!-- end right-container -->
	</div>
	<!-- end login -->
</template>

<script>
import AuthService from "../service/authService";
import Swal from 'sweetalert2'
import axios from 'axios'
import Vue from 'vue'
import Helper from "@/Helper/customHelper";

export default {
	data() {
		return {
			LoginMode: 'fsAdmin',
			UserName: '',
			optionModal: {
				title: 'Alert',
				titleClass: "text-light",
				headerClass: "modal-bg-head",
				centered: true,
				okVariant: 'danger'
			},
			paramUsername: ''
		}
	},
	created() {
		if (window.location.search.toString().includes('username')) {
			this.paramUsername = window.location.search.toString().substring(10)
		}

	},
	async mounted() {
		if (!Helper.isNullOrEmpty(this.paramUsername)) {

			if (this.$parent.login === 2) {
				sessionStorage.clear()
				localStorage.clear()
				this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
			}

			this.$parent.$refs.lazyload.classList.add('open')
			await AuthService.Login({
				Username: this.paramUsername,
				Email: this.paramUsername
			}).then(resp => {
				console.log(resp)
				if (resp.data.status === true) {
					const getprop = resp.data.body
					let rName = [{ rid: 1, rname: 'MK/MC' }, { rid: 2, rname: 'MC Supervisor' }, { rid: 3, rname: 'OS Supervisor' },
					{ rid: 4, rname: 'OS Staff' }, { rid: 5, rname: 'OS Checker' }, { rid: 6, rname: 'SAP' },
					{ rid: 10, rname: 'Admin' }, { rid: 11, rname: 'Auditor' }, { rid: 12, rname: 'LC' }]
					var RName = []
					getprop.roleId.split(',').forEach(roleID => {
						rName.forEach(item => {
							if (item.rid == roleID) {
								RName.push(item.rname)
							}
						})
					})

					var tempUser = {
						Email: getprop.email,
						Fname: getprop.fname,
						EmpId: getprop.id,
						Name: getprop.name,
						Surename: getprop.surename,
						RoleId: getprop.roleId.split(','), //  Get RoleID from last digit 
						RoleName: RName.join(', '),
						Telephone: getprop.telephone,
					}
					sessionStorage.setItem('userInfo', JSON.stringify(tempUser))
					sessionStorage.setItem('token', resp.data.token)
					sessionStorage.setItem('SessionEmpID', tempUser.EmpId)
					sessionStorage.setItem('displayName', tempUser.Fname)
					this.$parent.login = 2
					// sessionStorage.setItem('RoleID', JSON.stringify(tempUser.RoleId))
					// console.log(JSON.parse(sessionStorage.getItem('RoleID')))

					this.$cookies.set("userInfo", JSON.stringify(tempUser), "1d").set("token", resp.data.token, "1d").set("SessionEmpID", tempUser.EmpId, "1d").set("displayName", tempUser.Fname, "1d")

					this.$parent.checkLogin()
				}
			})
		}
		else {
			this.getUserAD()
		}

		this.$parent.$refs.lazyload.classList.remove('open')

	},
	methods: {
		getUserAD() {
			AuthService.getAD_Users().then(resp => {
				console.log('getAD_Users', resp.data)
				if (resp.data) {
					axios.defaults.baseURL = Vue.prototype.$config.apiUrl;
					this.getUserProfile(resp.data)
				}
			})
		},
		getUserProfile(email) {
			document.querySelector('#lazyload').classList.add('open')

			AuthService.getAD_UsersProfile({
				"username": email
			}).then(resp => {
				console.log('getUserProfile', resp)
				if (resp.data.status === true) {

					const getprop = resp.data.body
					let rName = [{ rid: 1, rname: 'MK/MC' }, { rid: 2, rname: 'MC Supervisor' }, { rid: 3, rname: 'OS Supervisor' },
					{ rid: 4, rname: 'OS Staff' }, { rid: 5, rname: 'OS Checker' }, { rid: 6, rname: 'SAP' },
					{ rid: 10, rname: 'Admin' }, { rid: 11, rname: 'Auditor' }, { rid: 12, rname: 'LC' }]
					var RName = []
					getprop.roleId.split(',').forEach(roleID => {
						rName.forEach(item => {
							if (item.rid == roleID) {
								RName.push(item.rname)
							}
						})
					})

					var tempUser = {
						Email: getprop.email,
						Fname: getprop.fname,
						EmpId: getprop.id,
						Name: getprop.name,
						Surename: getprop.surename,
						RoleId: getprop.roleId.split(','), //  Get RoleID from last digit 
						RoleName: RName.join(', '),
						Telephone: getprop.telephone,
					}
					sessionStorage.setItem('userInfo', JSON.stringify(tempUser))
					sessionStorage.setItem('token', resp.data.token)
					sessionStorage.setItem('SessionEmpID', tempUser.EmpId)
					sessionStorage.setItem('displayName', tempUser.Fname)

					this.$cookies.set("userInfo", JSON.stringify(tempUser), "1d").set("token", resp.data.token, "1d").set("SessionEmpID", tempUser.EmpId, "1d").set("displayName", tempUser.Fname, "1d")

					this.$parent.$refs.lazyload.classList.toggle('open')
					this.$parent.checkLogin()
				} else {
					this.$parent.$refs.lazyload.classList.toggle('open')
					Swal.fire({
						icon: 'warning',
						title: 'Warning',
						text: 'Email is invalid'
					})
				}
			})
		},
		loginFsAdmin: function (e) {
			e.preventDefault()

			document.querySelector('#lazyload').classList.add('open')

			AuthService.Login({
				Username: this.paramUsername,
				Email: this.paramUsername
			}).then(resp => {
				console.log(resp)
				if (resp.data.status === true) {
					const getprop = resp.data.body
					let rName = [{ rid: 1, rname: 'MK/MC' }, { rid: 2, rname: 'MC Supervisor' }, { rid: 3, rname: 'OS Supervisor' },
					{ rid: 4, rname: 'OS Staff' }, { rid: 5, rname: 'OS Checker' }, { rid: 6, rname: 'SAP' },
					{ rid: 10, rname: 'Admin' }, { rid: 11, rname: 'Auditor' }, { rid: 12, rname: 'LC' }]
					var RName = []
					getprop.roleId.split(',').forEach(roleID => {
						rName.forEach(item => {
							if (item.rid == roleID) {
								RName.push(item.rname)
							}
						})
					})

					var tempUser = {
						Email: getprop.email,
						Fname: getprop.fname,
						EmpId: getprop.id,
						Name: getprop.name,
						Surename: getprop.surename,
						RoleId: getprop.roleId.split(','), //  Get RoleID from last digit 
						RoleName: RName.join(', '),
						Telephone: getprop.telephone,
					}
					sessionStorage.setItem('userInfo', JSON.stringify(tempUser))
					sessionStorage.setItem('token', resp.data.token)
					sessionStorage.setItem('SessionEmpID', tempUser.EmpId)
					sessionStorage.setItem('displayName', tempUser.Fname)
					this.$cookies.set("userInfo", JSON.stringify(tempUser), "1d").set("token", resp.data.token, "1d").set("SessionEmpID", tempUser.EmpId, "1d").set("displayName", tempUser.Fname, "1d")

					this.$parent.$refs.lazyload.classList.toggle('open')
					this.$parent.checkLogin()
				} else {
					this.$parent.$refs.lazyload.classList.toggle('open')
					Swal.fire({
						icon: 'warning',
						title: 'Warning',
						text: 'Email is invalid'
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.input-group {
	&:focus {
		display: none;
	}

	.input-group-prepend {
		.input-group-text {
			background: unset;
			padding-right: 0;
			color: rgb(126, 124, 124);
		}
	}

	.form-control {
		border-left: none;

		&:focus {
			box-shadow: unset;
			border: 1px solid #ced4da;
			border-left: none;
		}
	}
}
</style>
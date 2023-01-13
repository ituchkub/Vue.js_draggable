<template>
  <div id="app">
    <div class="page-loader-wrapper">
      <div class="loader">
        <div class="m-t-30"><img src="../public/assets/images/logo-icon.svg" width="48" height="48" alt="Lucid"></div>
        <p>Please wait...</p>
      </div>
    </div>
    <!-- Overlay For Sidebars -->

    <div id="wrapper">
      <nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-btn">
            <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
          </div>

          <div class="navbar-brand">
            <a href="index.html"><img src="../public/assets/images/logo.svg" alt="Lucid Logo"
                class="img-responsive logo"></a>
          </div>

          <div class="navbar-right">
            <form id="navbar-search" class="navbar-form search-form">
              <input value="" class="form-control" placeholder="Search here..." type="text">
              <button type="button" class="btn btn-default"><i class="icon-magnifier"></i></button>
            </form>

            <div id="navbar-menu">
              <ul class="nav navbar-nav">
                <li><a href="app-events.html" class="icon-menu d-none d-sm-block d-md-none d-lg-block"><i
                      class="icon-calendar"></i></a></li>
                <li><a href="app-chat.html" class="icon-menu d-none d-sm-block"><i class="icon-bubbles"></i></a></li>
                <li><a href="app-inbox.html" class="icon-menu d-none d-sm-block"><i class="icon-envelope"></i><span
                      class="notification-dot"></span></a></li>
                <li class="dropdown">
                  <a href="javascript:void(0);" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                    <i class="icon-bell"></i>
                    <span class="notification-dot"></span>
                  </a>
                  <ul class="dropdown-menu notifications animated shake">
                    <li class="header"><strong>You have 4 new Notifications</strong></li>
                    <li>
                      <a href="javascript:void(0);">
                        <div class="media">
                          <div class="media-left">
                            <i class="icon-info text-warning"></i>
                          </div>
                          <div class="media-body">
                            <p class="text">Campaign <strong>Holiday Sale</strong> is nearly reach budget limit.</p>
                            <span class="timestamp">10:00 AM Today</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <div class="media">
                          <div class="media-left">
                            <i class="icon-like text-success"></i>
                          </div>
                          <div class="media-body">
                            <p class="text">Your New Campaign <strong>Holiday Sale</strong> is approved.</p>
                            <span class="timestamp">11:30 AM Today</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <div class="media">
                          <div class="media-left">
                            <i class="icon-pie-chart text-info"></i>
                          </div>
                          <div class="media-body">
                            <p class="text">Website visits from Twitter is 27% higher than last week.</p>
                            <span class="timestamp">04:00 PM Today</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <div class="media">
                          <div class="media-left">
                            <i class="icon-info text-danger"></i>
                          </div>
                          <div class="media-body">
                            <p class="text">Error on website analytics configurations</p>
                            <span class="timestamp">Yesterday</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li class="footer"><a href="javascript:void(0);" class="more">See all notifications</a></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="javascript:void(0);" class="dropdown-toggle icon-menu" data-toggle="dropdown"><i
                      class="icon-equalizer"></i></a>
                  <ul class="dropdown-menu user-menu menu-icon animated bounceIn">
                    <li class="menu-heading">ACCOUNT SETTINGS</li>
                    <li><a href="javascript:void(0);"><i class="icon-note"></i> <span>Basic</span></a></li>
                    <li><a href="javascript:void(0);"><i class="icon-equalizer"></i> <span>Preferences</span></a></li>
                    <li><a href="javascript:void(0);"><i class="icon-lock"></i> <span>Privacy</span></a></li>
                    <li><a href="javascript:void(0);"><i class="icon-bell"></i> <span>Notifications</span></a></li>
                    <li class="menu-heading">BILLING</li>
                    <li><a href="javascript:void(0);"><i class="icon-credit-card"></i> <span>Payments</span></a></li>
                    <li><a href="javascript:void(0);"><i class="icon-printer"></i> <span>Invoices</span></a></li>
                    <li><a href="javascript:void(0);"><i class="icon-refresh"></i> <span>Renewals</span></a></li>
                  </ul>
                </li>
                <li><a href="page-login.html" class="icon-menu"><i class="icon-login"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <MainMenu />
      <Taskboard />
    </div>
  </div>

</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./components/TaskCard.vue";
import MainMenu from './components/MainMenu.vue'
import Taskboard from './components/Taskboard.vue'
import ConfigService from '../service/configService'
export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    MainMenu, Taskboard
  },
  data() {
    return {
      modalShow: true,
      page: true,
      module: "",
      columns: [],
      TaskId: '',
      WorkId: '',
      TaskData: {
        _Header: '',
        _Desc: ''
      }
    };
  },
  async mounted() {
    this.onLoadData();

  }, methods: {
    checkEnd: function (evt) {

      var _fromId = evt.from.offsetParent.id
      var _toId = evt.to.offsetParent.id

      evt.from.childNodes.forEach(function (child, index) {
        onUpdateWork(_fromId, child.id, index)
      });


      evt.to.childNodes.forEach(function (child, index) {
        onUpdateWork(_toId, child.id, index)

      });


      function onUpdateWork(_taskId, _WorkId, _Sorting) {
        let payload = {
          //sessionEmpID: sessionStorage.getItem('SessionEmpID'),
          body: {
            taskId: _taskId,
            workId: _WorkId,
            sorting: _Sorting
          },
          module: 'updateWork',
        }

        console.log(payload)
        ConfigService.ConfigGetTaskWork(payload).then(resp => {

          if (resp.data.status) {
            //this.columns = resp.data.body
            //this.pagination.totalRows = resp.data.body.length
          } else {
            //this.columns = []
          }
        })
      }

    },

    async onSave() {
      this.$refs['m_Master'].hide();
      let payload =
      {
        sessionEmpID: 0,
        body: {
          taskId: this.TaskId,
          WorkId: this.WorkId,
          header: this.TaskData._Header,
          des: this.TaskData._Desc
        },
        module: this.module
      }
      ConfigService.ConfigGetJobWork(payload).then(resp => {
        if (resp.data.status) {

          this.onLoadData();
          this.TaskData._Desc = this.TaskData._Header = "";
        } else {

          this.onLoadData();
        }
      })
    },

    onInsert(_taskId) {
      this.$refs['m_Master'].show();
      this.TaskData._Desc = this.TaskData._Header = "";
      this.TaskId = _taskId
      this.module = "insert";
      //console.log(_taskId)

    },

    async onUpdate(_workId) {
      this.$refs['m_Master'].show();
      this.WorkId = _workId
      this.module = "update";

      let payload = {
        sessionEmpID: 0,
        body: {
          workId: _workId,
          des: ""
        },
        module: 'getlist',
      }
      await ConfigService.ConfigGetJobWork(payload).then(resp => {
        if (resp.data.status) {
          console.log(resp.data.body[0])

          this.TaskData._Header = resp.data.body[0].Header
          this.TaskData._Desc = resp.data.body[0].Des

        } else {

        }
      })



    },

    async onDelete(_workId) {

      //console.log(_workId)
      //this.$refs['m_Del'].show();
      let payload = {
        sessionEmpID: 0,
        body: {
          workId: _workId,
          des: ""
        },
        module: 'delete',
      }
      await ConfigService.ConfigGetTaskWork(payload).then(resp => {
        if (resp.data.status) {
          this.onLoadData()
        } else {
          this.onLoadData()
        }
      })
    },

    mdCancel(NameID) {
      this.$refs[NameID].hide()
    },

    async onLoadData() {
      let payload = {
        //sessionEmpID: sessionStorage.getItem('SessionEmpID'),
        body: {
          taskId: "",
          des: ""
        },
        module: 'getlist',
      }
      await ConfigService.ConfigGetTaskWork(payload).then(resp => {
        // console.log(resp)
        if (resp.data.status) {
          this.columns = resp.data.body
          //this.pagination.totalRows = resp.data.body.length
        } else {
          this.columns = []
        }
      })

    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

.column-width {
  min-width: 320px;
  width: 100%;
}

/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>

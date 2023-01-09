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
      <div id="main-content" class="taskboard">
        <div class="container-fluid">
          <div class="block-header">
            <div class="row">
              <div class="col-lg-6 col-md-8 col-sm-12">
                <h2><a href="javascript:void(0);" class="btn btn-xs btn-link btn-toggle-fullwidth"><i
                      class="fa fa-arrow-left"></i></a> TaskBoard</h2>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html"><i class="icon-home"></i></a></li>
                  <li class="breadcrumb-item">Apps</li>
                  <li class="breadcrumb-item active">TaskBoard</li>
                </ul>
              </div>
              <div class="col-lg-6 col-md-4 col-sm-12 text-right">
                <div class="bh_chart hidden-xs">
                  <div class="float-left m-r-15">
                    <small>Visitors</small>
                    <h6 class="mb-0 mt-1"><i class="icon-user"></i> 1,784</h6>
                  </div>
                  <span class="bh_visitors float-right">2,5,1,8,3,6,7,5</span>
                </div>
                <div class="bh_chart hidden-sm">
                  <div class="float-left m-r-15">
                    <small>Visits</small>
                    <h6 class="mb-0 mt-1"><i class="icon-globe"></i> 325</h6>
                  </div>
                  <span class="bh_visits float-right">10,8,9,3,5,8,5</span>
                </div>
                <div class="bh_chart hidden-sm">
                  <div class="float-left m-r-15">
                    <small>Chats</small>
                    <h6 class="mb-0 mt-1"><i class="icon-bubbles"></i> 13</h6>
                  </div>
                  <span class="bh_chats float-right">1,8,5,6,2,4,3,2</span>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="flex">
              <div v-for="column in columns" :key="column.title" class="card"
                :class="column.title.toLocaleLowerCase() + '_task '">
                <div class="header">
                  <h2>{{ column.title }}</h2>
                  <ul class="header-dropdown">
                    <li><a href="javascript:void(0);" data-toggle="modal" data-target="#addcontact"><i
                          class="icon-plus"></i></a></li>
                  </ul>
                </div>
                <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                <draggable :list="column.tasks" :animation="200" @end="checkEnd" ghost-class="ghost-card" group="tasks">
                  <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                  <task-card v-for="(task) in   column.tasks" :key="task.id" :task="task"
                    class="mt-3 cursor-move"></task-card>
                  <!-- </transition-group> -->
                </draggable>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./components/TaskCard.vue";
import MainMenu from './components/MainMenu.vue'
import ConfigService from '../service/configService'
export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    MainMenu
  },
  data() {
    return {
      page: true,
      columns: []
    };
  }, async mounted() {
    this.onLoadData();

  }, methods: {
    checkEnd: function (evt) {
      console.log(evt.from.offsetParent);
      console.log(evt.to.offsetParent);
      console.log(evt.from);
      console.log(evt.to);
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

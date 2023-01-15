<template>
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
          <!-- <div class="col-lg-6 col-md-4 col-sm-12 text-right">
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
          </div> -->
        </div>
      </div>
      <div class="">
        <div class="flex">
          <div v-for="column in columns" :key="column.title" class="card" :id="column.taskId" :class="column.title.toLocaleLowerCase() + '_task ' +
          (column.title.toLocaleLowerCase() === 'completed' ? 'bg-dark' : '')">
            <div class="header">
              <h2>{{ column.title }}</h2>
              <ul class="header-dropdown">
                <li><a href="javascript:void(0);" @click="onInsert(column.taskId);"><i class="icon-plus"></i></a>
                </li>
              </ul>
            </div>
            <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
            <draggable :list="column.tasks" :animation="200" @end="checkEnd" ghost-class="ghost-card" group="tasks">
              <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
              <!-- <task-card v-for="(task) in   column.tasks" :key="task.workId" :task="task" :id="task.workId"
                    class="mt-3 cursor-move"></task-card> -->
              <div v-for="(task) in   column.tasks" :id="task.workId" v-if="task.workId" class="mt-3 cursor-move">
                <div class="dd-handle">
                  <div class=" flex justify-between" style="display: block;">
                    <div class="headerChild">
                      <h6>{{ task.head }}</h6>
                      <ul class="header-dropdown" style="position: absolute;top: -10px;">
                        <div>
                          <li style="display: inline-block"><a href="javascript:void(0);"
                              @click="onUpdate(task.workId);"><i class="icon-note"></i></a>
                          </li>
                          <li style="display: inline-block;padding: 0px 0px 0px 4px;"><a href="javascript:void(0);"
                              @click="onDelete(task.workId);"><i class="icon-close"></i></a>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <p>{{ task.title }}</p>
                  </div>
                </div>

              </div>
              <!-- </transition-group> -->
            </draggable>
          </div>
        </div>
      </div>
      <b-modal ref="m_Master" size="s" title="Add New Task" hide-footer hide-backdrop>
        <form @submit.prevent="onSave()" @keypress.enter="$event.preventDefault();">
          <!-- <div class="modal-dialog" role="document"> -->
          <!-- <div class="modal-content">
          <div class="modal-header">
            <h6 class="title" id="defaultModalLabel"></h6>
          </div> -->
          <!-- <div class="modal-body"> -->
          <div class="row clearfix">
            <div class="col-12">
              <div class="form-group">
                <!-- <input type="text" class="form-control" placeholder="Job title"> -->
                <b-form-input v-model.trim="TaskData._Header" placeholder="Title" />

              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <!-- <textarea class="form-control" placeholder="Description"></textarea> -->
                <b-form-textarea v-model.trim="TaskData._Desc" placeholder="Detail" />
              </div>
            </div>
          </div>
          <!-- </div> -->
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Add</button>
            <button type="button" class="btn btn-secondary" @click="mdCancel('m_Master')">CLOSE</button>
          </div>
          <!-- </div> -->
          <!-- </div> -->
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

import ConfigService from '../../service/configService'
export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
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

<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="logo-text">IdeaHub</span>
        </router-link>

        <nav class="nav-menu">
          <div 
            v-for="item in channels" 
            :key="item.id"
            class="nav-item"
            :class="{ active: activeChannel === item.id }"
            @click="switchChannel(item.id)"
          >
            {{ item.name }}
          </div>
        </nav>

        <div class="header-actions">
          <el-button type="primary" @click="showPostDialog">
            <el-icon><Plus /></el-icon> 发帖
          </el-button>
          <el-dropdown trigger="click">
            <el-avatar :size="36" src="https://picsum.photos/40" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="content-wrapper">
      <!-- 左侧筛选 -->
      <aside class="filter-section">
        <div class="filter-group">
          <h3 class="filter-title">项目状态</h3>
          <el-checkbox-group v-model="selectedStatus">
            <el-checkbox label="recruiting">招募中</el-checkbox>
            <el-checkbox label="ongoing">进行中</el-checkbox>
            <el-checkbox label="completed">已完成</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="filter-group">
          <h3 class="filter-title">项目类型</h3>
          <el-radio-group v-model="selectedType">
            <el-radio label="all">全部</el-radio>
            <el-radio 
              v-for="item in channelTypes" 
              :key="item.id" 
              :label="item.id"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </div>
      </aside>

      <!-- 活动展示区 -->
      <div class="project-grid">
        <project-card 
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @join="handleJoin"
        />
      </div>
    </main>

    <!-- 发帖对话框 -->
    <el-dialog v-model="postDialogVisible" title="创建新项目">
      <el-form :model="newProject" label-width="80px">
        <el-form-item label="项目标题">
          <el-input v-model="newProject.title" />
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select v-model="newProject.type">
            <el-option
              v-for="item in channelTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="newProject.description" type="textarea" />
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            @change="handleUpload"
          >
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="postDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitProject">立即发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import ProjectCard from '@/components/ProjectCard.vue'

const router = useRouter()

// 频道数据
const channels = ref([
  { id: 'tech', name: '技术开发', color: '#409EFF' },
  { id: 'event', name: '创意活动', color: '#67C23A' },
  { id: 'game', name: '游戏组队', color: '#E6A23C' }
])

const activeChannel = ref('tech')
const selectedStatus = ref(['recruiting'])
const selectedType = ref('all')
const postDialogVisible = ref(false)
const newProject = ref({
  title: '',
  type: 'tech',
  description: '',
  cover: null
})

// 模拟数据
const projects = ref([
  {
    id: 1,
    title: '智能家居物联网开发',
    type: 'tech',
    cover: 'https://picsum.photos/300/200?tech',
    progress: 45,
    members: 3,
    capacity: 5,
    status: 'recruiting'
  },
  {
    id: 2,
    title: '周末城市骑行活动',
    type: 'event',
    cover: 'https://picsum.photos/300/200?event',
    progress: 80,
    members: 15,
    capacity: 20,
    status: 'ongoing'
  }
])

// 计算属性
const channelTypes = computed(() => 
  channels.value.filter(c => c.id === activeChannel.value)
)

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const typeMatch = selectedType.value === 'all' || 
      project.type === selectedType.value
    const statusMatch = selectedStatus.value.length === 0 ||
      selectedStatus.value.includes(project.status)
    return typeMatch && statusMatch
  })
})

// 方法
const switchChannel = (channelId) => {
  activeChannel.value = channelId
  selectedType.value = 'all'
}

const showPostDialog = () => {
  postDialogVisible.value = true
}

const handleUpload = (file) => {
  newProject.value.cover = URL.createObjectURL(file.raw)
}

const submitProject = () => {
  projects.value.unshift({
    ...newProject.value,
    id: Date.now(),
    members: 0,
    capacity: 10,
    progress: 0,
    status: 'recruiting'
  })
  postDialogVisible.value = false
  newProject.value = { title: '', type: 'tech', description: '', cover: null }
}

const handleJoin = (projectId) => {
  const project = projects.value.find(p => p.id === projectId)
  if (project.members < project.capacity) {
    project.members++
  }
}

const goToProfile = () => {
  router.push('/profile')
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
$primary-color: #409EFF;
$success-color: #67C23A;
$warning-color: #E6A23C;

.main-container {
  background: #f5f7fa;
  min-height: 100vh;
}

.app-header {
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0 24px;

  .header-content {
    max-width: 1280px;
    margin: 0 auto;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
  color: $primary-color;
}

.nav-menu {
  display: flex;
  gap: 40px;

  .nav-item {
    color: #606266;
    cursor: pointer;
    padding: 8px 0;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: $primary-color;
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background: currentColor;
      }
    }

    &:hover {
      color: adjust-color($primary-color, $lightness: -10%);
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;

  :deep(.el-upload) {
    margin-right: 10px;
  }
}

.content-wrapper {
  max-width: 1280px;
  margin: 24px auto;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}

.filter-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .filter-title {
    font-size: 14px;
    color: #909399;
    margin-bottom: 12px;
  }
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding-right: 24px;
}
</style>
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
            v-for="item in navItems"
            :key="item.path"
            class="nav-item"
            :class="{ active: activeNav === item.path }"
            @click="switchNav(item.path)"
          >
            {{ item.label }}
          </div>
        </nav>

        <div class="header-actions">
          <el-input
            v-model="searchText"
            placeholder="搜索创意项目..."
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-button type="text" class="action-btn">
            <el-icon :size="20"><User /></el-icon>
          </el-button>

          <el-badge :value="3" class="action-btn">
            <el-icon :size="20"><Bell /></el-icon>
          </el-badge>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
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
            <el-radio label="tech">技术开发</el-radio>
            <el-radio label="event">快闪活动</el-radio>
            <el-radio label="game">游戏组队</el-radio>
          </el-radio-group>
        </div>
      </aside>

      <!-- 项目瀑布流 -->
      <div class="project-grid">
        <div 
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
        >
          <div class="card-image">
            <img :src="project.cover" :alt="project.title">
            <div class="card-tag" :class="project.type">
              {{ typeLabels[project.type] }}
            </div>
          </div>

          <div class="card-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <div class="project-meta">
              <el-progress 
                :percentage="project.progress" 
                :show-text="false"
                class="progress-bar"
              />
              <div class="meta-info">
                <span class="members">
                  <el-icon><User /></el-icon>
                  {{ project.members }}/{{ project.capacity }}
                </span>
                <el-button 
                  type="primary" 
                  size="small"
                  @click="handleJoin(project.id)"
                >
                  立即加入
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, User, Bell } from '@element-plus/icons-vue'

// 模拟数据
const projects = ref([
  {
    id: 1,
    title: '智能家居物联网开发',
    type: 'tech',
    cover: 'https://picsum.photos/300/200?random=1',
    progress: 45,
    members: 3,
    capacity: 5
  },
  {
    id: 2,
    title: '周末城市骑行活动',
    type: 'event',
    cover: 'https://picsum.photos/300/200?random=2',
    progress: 80,
    members: 15,
    capacity: 20
  }
])

// 导航项
const navItems = ref([
  { label: '技术开发', path: 'tech' },
  { label: '创意活动', path: 'event' },
  { label: '游戏组队', path: 'game' }
])

const activeNav = ref('tech')
const searchText = ref('')
const selectedStatus = ref(['recruiting'])
const selectedType = ref('all')

// 类型标签映射
const typeLabels = {
  tech: '技术开发',
  event: '创意活动',
  game: '游戏组队'
}

// 过滤后的项目
const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const typeMatch = selectedType.value === 'all' || 
      project.type === selectedType.value
    const statusMatch = selectedStatus.value.length === 0 ||
      (selectedStatus.value.includes('recruiting') && project.progress < 100) ||
      (selectedStatus.value.includes('ongoing') && project.progress >= 100)
    
    return typeMatch && statusMatch
  })
})

const switchNav = (path) => {
  activeNav.value = path
}

const handleJoin = (id) => {
  console.log('Join project:', id)
}
</script>

<style lang="scss" scoped>
// 主题色
$primary-color: #6C5DD3;
$secondary-color: #B2B3BD;
$background-color: #F8F9FB;

.main-container {
  min-height: 100vh;
  background-color: $background-color;
}

.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;

  .header-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.logo {
  text-decoration: none;
  
  .logo-text {
    font-size: 24px;
    font-weight: 700;
    color: $primary-color;
    letter-spacing: 1px;
  }
}

.nav-menu {
  display: flex;
  gap: 40px;
  margin-left: 40px;

  .nav-item {
    color: $secondary-color;
    cursor: pointer;
    transition: color 0.3s;
    position: relative;

    &.active {
      color: $primary-color;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 3px;
        background: $primary-color;
        border-radius: 2px;
      }
    }

    &:hover {
      color: darken($primary-color, 10%);
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;

  .search-input {
    width: 240px;
  }

  .action-btn {
    color: $secondary-color;
    padding: 8px;

    &:hover {
      color: $primary-color;
    }
  }
}

.content-wrapper {
  max-width: 1280px;
  margin: 24px auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}

.filter-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: fit-content;

  .filter-title {
    font-size: 14px;
    color: $secondary-color;
    margin-bottom: 12px;
  }

  :deep(.el-checkbox),
  :deep(.el-radio) {
    display: flex;
    margin-bottom: 8px;
  }
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }

  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      color: white;
      background: $primary-color;

      &.event {
        background: #FF9F43;
      }
      &.game {
        background: #7FBA7A;
      }
    }
  }

  .card-content {
    padding: 16px;

    .project-title {
      font-size: 16px;
      margin: 0 0 12px;
      color: #2B2B2B;
    }

    .progress-bar {
      margin-bottom: 12px;
    }

    .meta-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .members {
        color: $secondary-color;
        font-size: 14px;

        .el-icon {
          vertical-align: middle;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
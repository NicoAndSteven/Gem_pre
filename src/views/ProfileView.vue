<template>
    <div class="profile-container">
      <header class="profile-header">
        <el-avatar :size="72" :src="user.avatar" />
        <div class="user-info">
          <h2>{{ user.name }}</h2>
          <p class="email">{{ user.email }}</p>
        </div>
      </header>
  
      <el-tabs v-model="activeTab">
        <!-- 我的项目 -->
        <el-tab-pane label="我的项目" name="projects">
          <div class="project-list">
            <project-card 
              v-for="project in myProjects"
              :key="project.id"
              :project="project"
            />
          </div>
        </el-tab-pane>
  
        <!-- 参与项目 -->
        <el-tab-pane label="参与项目" name="participated">
          <div class="project-list">
            <project-card 
              v-for="project in participatedProjects"
              :key="project.id"
              :project="project"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProjectCard from '@/components/ProjectCard.vue'
  
  const activeTab = ref('projects')
  
  // 模拟用户数据
  const user = ref({
    name: '创新达人',
    email: 'innovator@ideahub.com',
    avatar: 'https://picsum.photos/80'
  })
  
  // 模拟项目数据
  const myProjects = ref([/* 同HomeView数据 */])
  const participatedProjects = ref([/* 参与项目数据 */])
  </script>
  
  <style lang="scss" scoped>
  .profile-container {
    max-width: 1280px;
    margin: 24px auto;
    padding: 0 24px;
  
    .profile-header {
      display: flex;
      align-items: center;
      padding: 24px;
      background: white;
      border-radius: 8px;
      margin-bottom: 24px;
  
      .user-info {
        margin-left: 24px;
  
        h2 {
          margin: 0;
          font-size: 24px;
          color: #303133;
        }
  
        .email {
          margin: 8px 0 0;
          color: #909399;
        }
      }
    }
  
    .project-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
  }
  
  :deep(.el-tabs__header) {
    background: white;
    padding: 0 24px;
    border-radius: 8px;
  }
  </style>
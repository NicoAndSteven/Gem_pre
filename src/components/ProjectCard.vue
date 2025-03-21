<template>
    <div class="project-card">
      <div class="card-header">
        <el-image :src="project.cover" fit="cover" class="card-image" />
        <div class="card-tag" :style="{ background: typeColor }">
          {{ typeLabel }}
        </div>
      </div>
      
      <div class="card-body">
        <h3 class="title">{{ project.title }}</h3>
        <div class="progress">
          <el-progress 
            :percentage="project.progress" 
            :show-text="false"
            :color="typeColor"
          />
          <span class="status">{{ projectStatus }}</span>
        </div>
        <div class="meta">
          <div class="members">
            <el-icon><User /></el-icon>
            {{ project.members }}/{{ project.capacity }}
          </div>
          <el-button 
            type="primary" 
            size="small" 
            :disabled="project.members >= project.capacity"
            @click="$emit('join', project.id)"
          >
            {{ joinButtonText }}
          </el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { User } from '@element-plus/icons-vue'
  
  const props = defineProps({
    project: {
      type: Object,
      required: true
    }
  })
  
  const typeLabel = computed(() => {
    const types = {
      tech: '技术开发',
      event: '创意活动',
      game: '游戏组队'
    }
    return types[props.project.type]
  })
  
  const typeColor = computed(() => {
    const colors = {
      tech: '#409EFF',
      event: '#67C23A',
      game: '#E6A23C'
    }
    return colors[props.project.type]
  })
  
  const projectStatus = computed(() => {
    const statusMap = {
      recruiting: '招募中',
      ongoing: '进行中',
      completed: '已完成'
    }
    return statusMap[props.project.status]
  })
  
  const joinButtonText = computed(() => {
    return props.project.members < props.project.capacity 
      ? '立即加入' 
      : '已满员'
  })
  </script>
  
  <style lang="scss" scoped>
  .project-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s;
  
    &:hover {
      transform: translateY(-4px);
    }
  
    .card-header {
      position: relative;
      height: 180px;
  
      .card-image {
        width: 100%;
        height: 100%;
      }
  
      .card-tag {
        position: absolute;
        top: 12px;
        left: 12px;
        padding: 4px 12px;
        border-radius: 14px;
        color: white;
        font-size: 12px;
      }
    }
  
    .card-body {
      padding: 16px;
  
      .title {
        margin: 0 0 12px;
        font-size: 16px;
        color: #303133;
      }
  
      .progress {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
  
        :deep(.el-progress-bar) {
          flex: 1;
          margin-right: 8px;
        }
  
        .status {
          font-size: 12px;
          color: #909399;
        }
      }
  
      .meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
  
        .members {
          color: #606266;
          display: flex;
          align-items: center;
  
          .el-icon {
            margin-right: 4px;
          }
        }
      }
    }
  }
  </style>
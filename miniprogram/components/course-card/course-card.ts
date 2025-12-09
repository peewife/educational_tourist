// components/course-card/course-card.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  data: {
    studentCountText: '0',
    ratingText: '0'
  },

  properties: {
    // 课程数据
    course: {
      type: Object,
      value: {}
    },
    // 展示模式: horizontal(横向) | vertical(纵向) | small(小卡片)
    mode: {
      type: String,
      value: 'horizontal'
    }
  },

  observers: {
    course(course) {
      const studentCount = course?.studentCount;
      const rating = course?.rating;

      let studentCountText = '0';
      if (typeof studentCount === 'number' && !Number.isNaN(studentCount)) {
        studentCountText = studentCount >= 1000
          ? `${(studentCount / 1000).toFixed(1)}k`
          : `${studentCount}`;
      }

      const ratingText = (typeof rating === 'number' && !Number.isNaN(rating))
        ? String(rating)
        : (rating || '0');

      this.setData({ studentCountText, ratingText });
    }
  },

  methods: {
    handleTap() {
      const { course } = this.data;
      if (course && course.id) {
        wx.navigateTo({
          url: `/pages/course-detail/course-detail?id=${course.id}`
        });
        this.triggerEvent('tap', { course });
      }
    }
  }
})

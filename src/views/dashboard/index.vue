<template>
  <div class="dashboard-container">
    <div class="portlet-title">
      <div class="caption font-darkblue bold" style=" text-align: center;" />

    </div>

    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">supnuevo-statistics</td>
      </tr>

    </table>
    <div id="map1" style="width: 800px; height: 800px;" />
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      noticeList: ''
    }
  },
  methods: {}
}
</script>

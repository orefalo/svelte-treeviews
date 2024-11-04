<script lang="ts">
  import chart from './chart.svg?raw';
  import cloud from './cloud-pod.svg?raw';
  import code from './code.svg?raw';
  import deployments from './deployments.svg?raw';
  import monitor from './monitor.svg?raw';
  import planning from './planning.svg?raw';
  import rocket from './rocket.svg?raw';
  import users from './users.svg?raw';

  let { name }: { name: string | undefined } = $props();

  let svg = $state('');

  function update(n) {
    switch (n) {
      case 'users':
        svg = users;
        break;
      case 'planning':
        svg = planning;
        break;
      case 'code':
        svg = code;
        break;
      case 'rocket':
        svg = rocket;
        break;
      case 'deployments':
        svg = deployments;
        break;
      case 'cloud-pod':
        svg = cloud;
        break;
      case 'monitor':
        svg = monitor;
        break;
      case 'chart':
        svg = chart;
        break;
      default:
        svg = '';
        console.log('ERROR: HeaderIcon unknown icon name ' + n);
    }
    console.log(n);
    console.log(svg);
  }

  update(name);
</script>

<span class="logo">
  {@html svg}
</span>

<style>
  .logo {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    vertical-align: middle;
    margin: 0 6px;
  }
</style>

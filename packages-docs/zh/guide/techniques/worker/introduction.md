# Worker

VonaJS 采用的是分布式体系，允许多个工作进程同时提供服务

## bean.worker

模块`a-worker`提供了全局 Bean `bean.worker`，用于管理工作进程

* 属性清单

|名称|说明|
|--|--|
|id|获取当前Worker Id|

* 方法清单

|名称|说明|
|--|--|
|exit|结束当前Worker|
|exitAll|结束所有Workers|
|reload|重启当前Worker|
|reloadAll|重启所有Workers|
|setAlive|设置指定Worker为存活状态|
|delAlive|删除指定Worker的存活状态|
|getAlive|获取指定Worker的存活状态|


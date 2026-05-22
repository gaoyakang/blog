# Supabase 数据库设置指南

本指南将帮助你完成 Supabase 数据库的设置。

## 前置条件

- 一个 Supabase 账户（免费注册：https://supabase.com/dashboard）

## 步骤 1：创建新的 Supabase 项目

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: 你的博客名称（例如：My Blog）
   - **Database Password**: 设置一个强密码（请妥善保管！）
   - **Region**: 选择离你最近的区域
4. 点击 "Create new project"
5. 等待项目创建完成（这可能需要几分钟）

## 步骤 2：获取 API 凭证

1. 项目创建完成后，进入项目设置
2. 在左侧菜单中点击 "Settings" → "API"
3. 复制以下信息：
   - **Project URL**: 这个就是 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: 这个就是 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret**: 这个就是 `SUPABASE_SERVICE_ROLE_KEY`（⚠️ 这个非常重要，不要暴露给客户端！）

## 步骤 3：创建数据库表

有两种方式可以创建表：

### 方式 A：使用 SQL 编辑器（推荐）

1. 在 Supabase Dashboard 左侧菜单中点击 "SQL Editor"
2. 点击 "New Query"
3. 复制 `supabase/migrations/001_create_post_views_table.sql` 文件中的内容
4. 粘贴到编辑器中
5. 点击 "Run" 执行查询

### 方式 B：使用 Table Editor

1. 在左侧菜单中点击 "Table Editor"
2. 点击 "New table"
3. 创建名为 `post_views` 的表，包含以下字段：
   - `id`: 类型 `int8`，勾选 "Is Identity"，设置为主键
   - `slug`: 类型 `text`，设置为唯一（Unique）
   - `views`: 类型 `int4`，默认值 `1`
   - `created_at`: 类型 `timestamptz`，默认值 `now()`
   - `updated_at`: 类型 `timestamptz`，默认值 `now()`
4. 点击 "Save" 创建表
5. 还需要手动设置 RLS 策略（参考 SQL 文件中的内容）

## 步骤 4：配置环境变量

1. 在项目根目录创建 `.env` 文件（如果还没有的话）
2. 复制 `.env.example` 的内容到 `.env`
3. 填入你的 Supabase 凭证：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**注意**：
- 不要将 `.env` 文件提交到 Git（它已经在 `.gitignore` 中了）
- 只将 `.env.example` 提交到 Git
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` 具有完整的数据库权限，永远不要在客户端代码中使用！

## 步骤 5：验证设置

1. 重新启动你的开发服务器：
   ```bash
   npm run dev
   ```

2. 访问博客的文章页面，查看阅读量是否正常显示和增加

## 表结构说明

### post_views 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 主键，自增 |
| slug | text | 文章的唯一标识 |
| views | int | 文章阅读次数 |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间 |

## 安全说明

我们使用了安全的 Row Level Security (RLS) 策略：
- ✅ 允许公开读取数据（任何人都可以查看阅读量）
- ✅ 只允许使用 service role key 进行写操作（防止滥用）
- ✅ 所有写操作都通过服务端 API 路由处理

安全架构：
1. **客户端**：使用 anon key（只读）
2. **服务端 API**：使用 service role key（完整权限）
3. **数据库**：通过 RLS 严格控制访问

这样即使有人尝试直接修改数据库，也会被 RLS 策略阻止！

## 部署到 Vercel

当你准备部署到 Vercel 时，需要：
1. 进入 Vercel 项目设置
2. 在 "Environment Variables" 部分添加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`（⚠️ 这个很重要！）
3. 重新部署项目

## 常见问题

### 问题：阅读量没有更新

**解决方案**：
- 检查环境变量是否正确设置
- 查看浏览器控制台是否有错误
- 确认 Supabase 表是否正确创建

### 问题：数据库权限错误

**解决方案**：
- 确认 RLS 策略是否正确设置
- 确认使用的是 anon key 而不是 service key

## 下一步

数据库设置完成后，你的博客应该可以正常统计文章阅读量了！

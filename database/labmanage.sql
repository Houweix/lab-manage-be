/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100136
 Source Host           : localhost:3306
 Source Schema         : labmanage

 Target Server Type    : MySQL
 Target Server Version : 100136
 File Encoding         : 65001

 Date: 07/05/2019 21:15:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '工号为主键',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员实体表，记录管理员信息' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('20156386', '4297f44b13955235245b2497399d7a93', '侯伟2');
INSERT INTO `admin` VALUES ('20156387', '4297f44b13955235245b2497399d7a93', 'zh');
INSERT INTO `admin` VALUES ('20156388', '4297f44b13955235245b2497399d7a93', 'zh3');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '班级关联上课情况',
  `class` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称',
  `course` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '物联网二班', '大学物理01');
INSERT INTO `class` VALUES (3, '物联网二班', '大学物理02');
INSERT INTO `class` VALUES (4, '物联网一班', '大学物理01');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '课程id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  `lab_id` int(11) NULL DEFAULT NULL COMMENT '关联的实验室id',
  `date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课日期',
  `start_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课开始时间',
  `end_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课结束时间',
  `week` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课周数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `lab_id`(`lab_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '课程表，记录实验课程的信息' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '大学物理01', 3, '星期三、星期五', '10', '12', '3-5');
INSERT INTO `course` VALUES (3, '大学物理02', 5, '星期三', '13', '15', '3-5');

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '成绩id',
  `student` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 成绩关联的学生',
  `class` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `course` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成绩关联的课程',
  `grade_val` int(11) NULL DEFAULT NULL COMMENT '成绩的值',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `t_grade_fk_1`(`student`) USING BTREE,
  INDEX `t_grade_fk_2`(`course`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '学生成绩表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (1, '吼姆', '物联网二班', '大学物理01', 90);
INSERT INTO `grade` VALUES (2, '侯伟', '物联网一班', '大学物理01', 70);

-- ----------------------------
-- Table structure for lab
-- ----------------------------
DROP TABLE IF EXISTS `lab`;
CREATE TABLE `lab`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '实验室id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '实验室名称',
  `admin_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '管理员名称',
  `status` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '实验室是否开放状态',
  `seat` int(100) NULL DEFAULT NULL COMMENT '实验室座位数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `lab_fk_1`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '实验室实体表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of lab
-- ----------------------------
INSERT INTO `lab` VALUES (3, '大学物理实验室', '20156386', '1', 30);
INSERT INTO `lab` VALUES (5, '大学物理光学01', '20156386', '1', 30);

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '信息id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '信息标题',
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布人姓名',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布内容',
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '信息公告' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (7, '测试2', '侯伟2', '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1', '2019年5月3日20时18分');
INSERT INTO `post` VALUES (8, '测试2', '侯伟2', '测试2测试2测试2测试2测试3', '2019年5月3日20时19分');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生id',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `class` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '学生表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('100002', '4297f44b13955235245b2497399d7a93', '萨克1', 'm', '物联网二班');
INSERT INTO `student` VALUES ('100003', '96e79218965eb72c92a549dd5a330112', '张胜1', 'f', '物联网一班');
INSERT INTO `student` VALUES ('100004', '214ee6af0b493fb9b2f8cd854165d89f', '王五', 'm', '物联网二班');
INSERT INTO `student` VALUES ('100005', '67b37e8ab1d150d720ce3bf1b466b5e4', '离开', 'm', '物联网一班');
INSERT INTO `student` VALUES ('100006', '84fade60c3c351b6594e7f44b29e246f', 'lisa', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100007', '41123ca97afa0c925eab6f5ead91de67', '吼姆', 'm', '物联网一班');
INSERT INTO `student` VALUES ('100008', 'c5f36b97b51ea3e7b4e09038ea4b96d3', '琪亚娜', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100009', '04b0cab3d8c4289346f5f9899e0e74c4', '芽衣', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100010', 'b56572c607fb98e3ec0587f2e555d3f3', '放电妹', 'f', '物联网一班');
INSERT INTO `student` VALUES ('100011', '9b3b85f7f02a8ffc10ec28d06fd4f956', 'dkjf', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100012', '4297f44b13955235245b2497399d7a93', '22222', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100013', 'f7e0ef389ac6133c88aedbd66b44a4e1', '侯伟2', 'm', '物联网二班');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师id',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师名字',
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `class_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称',
  `course_id` int(11) NULL DEFAULT NULL COMMENT '关联的授课id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacher_fk_1`(`course_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '教师表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('200000', '4297f44b13955235245b2497399d7a93', '侯伟', 'm', '物联网二班', 1);

SET FOREIGN_KEY_CHECKS = 1;

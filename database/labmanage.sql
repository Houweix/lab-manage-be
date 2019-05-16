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

 Date: 16/05/2019 14:47:04
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
INSERT INTO `admin` VALUES ('20156386', '4297f44b13955235245b2497399d7a93', '侯伟');
INSERT INTO `admin` VALUES ('20156388', '4297f44b13955235245b2497399d7a93', '宫兵');
INSERT INTO `admin` VALUES ('20156389', '4297f44b13955235245b2497399d7a93', '金虎');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '班级关联上课情况',
  `class` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级名称',
  `course` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '物联网二班', '大学物理上');
INSERT INTO `class` VALUES (4, '物联网一班', '大学物理上');
INSERT INTO `class` VALUES (7, '物联网一班', '射频识别技术');
INSERT INTO `class` VALUES (11, '物联网二班', '大学物理下');
INSERT INTO `class` VALUES (16, '物联网二班', '射频识别技术');
INSERT INTO `class` VALUES (17, '物联网二班', '计算机网络');

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '课程表，记录实验课程的信息' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '大学物理上', 5, '星期三、星期五', '9', '12', '3-5');
INSERT INTO `course` VALUES (2, '射频识别技术', 6, '星期四', '19', '21', '10-16');
INSERT INTO `course` VALUES (3, '大学物理下', 5, '星期四', '13', '15', '3-5');
INSERT INTO `course` VALUES (4, '数据库技术', 6, '星期二', '10', '12', '10-16');
INSERT INTO `course` VALUES (6, '计算机网络', 8, '星期一、星期三', '10', '12', '5-9');

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '成绩id',
  `student` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 成绩关联的学生',
  `class` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `course` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成绩关联的课程',
  `grade_val` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成绩的值',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `t_grade_fk_1`(`student`) USING BTREE,
  INDEX `t_grade_fk_2`(`course`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '学生成绩表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (1, '侯伟', '物联网二班', '大学物理上', '92');
INSERT INTO `grade` VALUES (2, '张玥', '物联网一班', '大学物理上', '70');
INSERT INTO `grade` VALUES (3, '周昊东', '物联网二班', '大学物理上', '100');
INSERT INTO `grade` VALUES (5, '侯伟', '物联网二班', '大学物理下', '99');
INSERT INTO `grade` VALUES (6, '张艺', '物联网二班', '大学物理上', '85');
INSERT INTO `grade` VALUES (9, '马英坤', '物联网二班', '大学物理下', '80');
INSERT INTO `grade` VALUES (11, '周昊东', '物联网一班', '射频识别技术', '99');
INSERT INTO `grade` VALUES (12, '侯伟', '物联网二班', '射频识别技术', '79');
INSERT INTO `grade` VALUES (13, '张玥', '物联网二班', '射频识别技术', '99');
INSERT INTO `grade` VALUES (14, '侯伟', '物联网二班', '计算机网络', '80');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '实验室实体表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of lab
-- ----------------------------
INSERT INTO `lab` VALUES (3, '大学物理实验室', '20156388', '1', 31);
INSERT INTO `lab` VALUES (5, '大学物理光学01', '20156386', '1', 30);
INSERT INTO `lab` VALUES (6, 'RFID实验室', '20156386', '0', 25);
INSERT INTO `lab` VALUES (7, '数据库实验室', '20156386', '1', 60);
INSERT INTO `lab` VALUES (8, '计算机网络实验室', '20156386', '1', 30);
INSERT INTO `lab` VALUES (9, '传感器实验室', '20156388', '1', 30);

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '信息公告' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (7, '计算机、软件学院学生党支部开展“学规章制度，做合格党员”主题党日活动', '侯伟', '为深入贯彻落实学校第十一次党代会精神，不断将“两学一做”学习教育常态化制度化引向深入，根据组织部关于确定2019 年3月、4月组织生活中心内容的通知要求，计算机科学技术学院、软件学院学生党支部全体学生党员于2019年4月24日14:00在3号楼223教室开展“学规章制度，做合格党员”主题党日活动，活动由辅导员马瑞雪老师主持。会上，由候悦同学带领党员们通过集体学习、交流研讨等形式认真学习。', '2019年5月3日20时18分');
INSERT INTO `post` VALUES (8, '计算机、软件学院开展“伴暖植树，四月迎春”植树活动', '侯伟', '钢筋水泥包裹着的慵懒冬天渐行渐远，阳光明媚的春日如约而至。春风吹新绿，植树正当时。为纪念五四运动100周年，弘扬“五四精神”，树立青春榜样，4月27日计算机科学技术学院、软件学院青年志愿者协会赴哈尔滨市松北区乐业镇杏林村开展主题为“伴暖植树，四月迎春”的植树活动。一场醒春活动，一片杨树林，一场温馨时光，就在此刻开启。\r\n\r\n\r\n\r\n\r\n上午八点半，志愿者们已经在黑龙江大学C区大门集合完毕，随后我们集体乘车去到植树点。经过一个多小时的漫长车程，我们终于来到了心心念念的植树地点。', '2019年5月3日20时19分');

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
INSERT INTO `student` VALUES ('100002', '4297f44b13955235245b2497399d7a93', '侯伟', 'm', '物联网二班');
INSERT INTO `student` VALUES ('100003', '96e79218965eb72c92a549dd5a330112', '张玥', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100004', '214ee6af0b493fb9b2f8cd854165d89f', '马英坤', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100005', '67b37e8ab1d150d720ce3bf1b466b5e4', '周昊东', 'm', '物联网一班');
INSERT INTO `student` VALUES ('100006', '84fade60c3c351b6594e7f44b29e246f', '张美欣', 'f', '物联网二班');
INSERT INTO `student` VALUES ('100007', '41123ca97afa0c925eab6f5ead91de67', '周雨涵', 'm', '物联网一班');
INSERT INTO `student` VALUES ('100008', '4297f44b13955235245b2497399d7a93', '周江琬', 'm', '物联网二班');

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
INSERT INTO `teacher` VALUES ('200001', '4297f44b13955235245b2497399d7a93', '徐辉', 'm', '物联网一班', 2);
INSERT INTO `teacher` VALUES ('200002', '4297f44b13955235245b2497399d7a93', '滕冠龙', 'm', '物联网二班', 3);
INSERT INTO `teacher` VALUES ('200003', '4297f44b13955235245b2497399d7a93', '谭龙', 'm', '物联网二班', 6);

SET FOREIGN_KEY_CHECKS = 1;

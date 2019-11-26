/*
 Navicat Premium Data Transfer

 Source Server         : gaoyuan
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : 127.0.0.1:3306
 Source Schema         : cf_shoop

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 26/11/2019 08:06:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cf_addresses
-- ----------------------------
DROP TABLE IF EXISTS `cf_addresses`;
CREATE TABLE `cf_addresses`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `shr_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人姓名',
  `mobile` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人手机号码',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '省',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '市',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '详细地址',
  `zipcode` int(10) NOT NULL COMMENT '邮政编码',
  `isdefault` tinyint(3) NOT NULL COMMENT '是否默认 0 不是 1 是',
  `user_id` int(10) NULL DEFAULT NULL COMMENT '用户id',
  `area_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地区id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_addresses
-- ----------------------------
INSERT INTO `cf_addresses` VALUES (18, '张三', '15984775637', '河北省', '石家庄市', '长安区', '的发生地方', 234000, 0, 3, '130102');

-- ----------------------------
-- Table structure for cf_class_ification
-- ----------------------------
DROP TABLE IF EXISTS `cf_class_ification`;
CREATE TABLE `cf_class_ification`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品分类名称',
  `value` int(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_class_ification
-- ----------------------------
INSERT INTO `cf_class_ification` VALUES (1, '分类', 1);
INSERT INTO `cf_class_ification` VALUES (2, '家居日用', 2);
INSERT INTO `cf_class_ification` VALUES (3, '数码外设', 3);
INSERT INTO `cf_class_ification` VALUES (4, '个性定制', 4);
INSERT INTO `cf_class_ification` VALUES (5, '模型手办', 5);

-- ----------------------------
-- Table structure for cf_goods_shops
-- ----------------------------
DROP TABLE IF EXISTS `cf_goods_shops`;
CREATE TABLE `cf_goods_shops`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `goods_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `goods_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `class_id` int(11) NULL DEFAULT NULL COMMENT '分类id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_goods_shops
-- ----------------------------
INSERT INTO `cf_goods_shops` VALUES (1, 'come get some 变色折叠雨伞', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184412_98890.jpg', 129.00, 2);
INSERT INTO `cf_goods_shops` VALUES (2, '雷神 印花T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184455_78192.jpg', 118.00, 2);
INSERT INTO `cf_goods_shops` VALUES (3, 'GO 荧光绿书法风T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184529_34697.jpg', 128.00, 2);
INSERT INTO `cf_goods_shops` VALUES (4, 'come get some T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184603_78532.jpg', 118.00, 2);
INSERT INTO `cf_goods_shops` VALUES (5, '双十一毁灭礼包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191031140854_21533.jpg', 111.00, 2);
INSERT INTO `cf_goods_shops` VALUES (6, '双十一卫衣礼包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191031141150_57799.jpg', 222.00, 2);
INSERT INTO `cf_goods_shops` VALUES (7, '双十一数码礼包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191031141414_25046.jpg', 222.00, 2);
INSERT INTO `cf_goods_shops` VALUES (8, '巴雷特礼包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190912170810_84736.jpg', 150.00, 2);
INSERT INTO `cf_goods_shops` VALUES (9, '618尊享大礼包2', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190621175839_80483.jpg', 208.00, 2);
INSERT INTO `cf_goods_shops` VALUES (10, '雷神T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190618142835_26572.jpg', 139.00, 2);
INSERT INTO `cf_goods_shops` VALUES (11, '双十一如锋礼包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191031141525_59455.jpg', 111.00, 2);
INSERT INTO `cf_goods_shops` VALUES (12, '巴雷特T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190912172344_29497.jpg', 108.00, 2);
INSERT INTO `cf_goods_shops` VALUES (13, '毁灭狙神精神t恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191021113552_40804.jpg', 118.00, 2);
INSERT INTO `cf_goods_shops` VALUES (14, '毁灭狙神精神腰带', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191021113706_88578.jpg', 89.00, 2);
INSERT INTO `cf_goods_shops` VALUES (15, '毁灭运动抽绳背包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191021113745_67863.jpg', 49.00, 2);
INSERT INTO `cf_goods_shops` VALUES (16, '穿越火线-保卫者斜挎包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190305181650_31704.jpg', 99.00, 2);
INSERT INTO `cf_goods_shops` VALUES (17, '火线战场帽子', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190314182502_58648.jpg', 97.00, 2);
INSERT INTO `cf_goods_shops` VALUES (18, '毁灭渐变文字T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191021113815_90952.jpg', 118.00, 2);
INSERT INTO `cf_goods_shops` VALUES (19, 'Martin x CF狙击油光护肤礼盒', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201905/20190507115853_11689.jpg', 179.00, 2);
INSERT INTO `cf_goods_shops` VALUES (20, 'CF刀锋灵狐单肩包 翻面小胸包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225104630_36016.jpg', 79.00, 2);
INSERT INTO `cf_goods_shops` VALUES (21, '王者之心帽子', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190312181727_90461.jpg', 119.00, 2);
INSERT INTO `cf_goods_shops` VALUES (22, '王者之心卫衣', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190312181150_99804.jpg', 169.00, 2);
INSERT INTO `cf_goods_shops` VALUES (23, '王者之心T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190313171150_17017.jpg', 109.00, 2);
INSERT INTO `cf_goods_shops` VALUES (24, '王者对决T恤', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190313200451_36330.jpg', 82.00, 2);
INSERT INTO `cf_goods_shops` VALUES (25, '王者之心-黑色军事风格马克杯', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190315141350_22175.jpg', 60.00, 2);
INSERT INTO `cf_goods_shops` VALUES (26, '穿越火线-假两件连帽卫衣L', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201904/20190428104409_38309.jpg', 199.00, 2);
INSERT INTO `cf_goods_shops` VALUES (27, 'CF穿越火线轻便斜跨小胸包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201904/20190404165329_84700.jpg', 69.00, 2);
INSERT INTO `cf_goods_shops` VALUES (28, '穿越火线-双面渔夫帽', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190305183307_26947.jpg', 69.00, 2);
INSERT INTO `cf_goods_shops` VALUES (29, '穿越火线-火线双肩包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190305181411_99313.jpg', 189.00, 2);
INSERT INTO `cf_goods_shops` VALUES (30, '穿越火线-多用围巾', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201902/20190212150800_18734.jpg', 79.00, 2);
INSERT INTO `cf_goods_shops` VALUES (31, 'CF火线乐扣杯', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225102531_63691.jpg', 69.00, 2);
INSERT INTO `cf_goods_shops` VALUES (32, 'CF个性防尘口罩-赛斯', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225102346_88577.jpg', 19.00, 2);
INSERT INTO `cf_goods_shops` VALUES (33, 'CF如锋双肩包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225104327_94967.jpg', 139.00, 2);
INSERT INTO `cf_goods_shops` VALUES (34, 'CF沙海连帽卫衣', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181010163041_83604.jpg', 149.00, 2);
INSERT INTO `cf_goods_shops` VALUES (35, 'CF运动护手腕', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225102229_47810.jpg', 35.00, 2);
INSERT INTO `cf_goods_shops` VALUES (36, '刀锋纸钱包', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225104728_36801.jpg', 39.00, 2);
INSERT INTO `cf_goods_shops` VALUES (37, 'CF超级卡哇伊可爱帅气酷炫卡通杯垫', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225114417_30426.jpg', 25.00, 2);
INSERT INTO `cf_goods_shops` VALUES (38, 'CF穿越火线-骷髅头戒指', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181031161748_23110.jpg', 199.00, 2);
INSERT INTO `cf_goods_shops` VALUES (39, 'CF穿越火线 骷髅头项链', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181031180601_47242.jpg', 199.00, 2);
INSERT INTO `cf_goods_shops` VALUES (40, '刀锋系列 蓝牙眼镜', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201905/20190513161307_10311.jpg', 128.00, 3);
INSERT INTO `cf_goods_shops` VALUES (41, 'CF手雷充电宝', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201903/20190307113753_64992.jpg', 97.00, 3);
INSERT INTO `cf_goods_shops` VALUES (42, '穿越火线-移动电源', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201902/20190212151738_38690.jpg', 169.00, 3);
INSERT INTO `cf_goods_shops` VALUES (43, 'CF入耳式炫酷发光运动耳机', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225101442_91716.jpg', 159.00, 3);
INSERT INTO `cf_goods_shops` VALUES (44, 'CF集线数据线三合一-黑侠', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225104523_86284.jpg', 69.00, 3);
INSERT INTO `cf_goods_shops` VALUES (45, 'CF年轻不服输U盘三合一', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225100938_70500.jpg', 169.00, 3);
INSERT INTO `cf_goods_shops` VALUES (46, 'CF十周年定制手机壳-小斯', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201807/20180720163357_65184.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (47, 'CF十周年定制手机壳-小沃', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201807/20180717104317_52080.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (48, 'CF十周年定制手机壳-灵狐', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201807/20180717104243_25406.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (49, 'CF十周年定制手机壳-小特', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201807/20180717104210_51035.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (50, 'CF十周年定制手机壳-刀锋', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201807/20180717104134_53686.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (51, '【CUBE】CF无线充电器-小沃', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201805/20180520140322_41925.jpg', 125.00, 3);
INSERT INTO `cf_goods_shops` VALUES (52, '3D定制手机壳-阿卡娜', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201801/20180109095607_13040.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (53, '3D定制手机壳-巴雷特', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201801/20180109104340_78656.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (54, '3D定制手机壳-沙莎', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201801/20180109100038_79835.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (55, '3D定制手机壳-凯瑞', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201801/20180109101416_56685.jpg', 59.00, 3);
INSERT INTO `cf_goods_shops` VALUES (56, '3D定制手机壳-阿依达', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201801/20180109155208_30821.jpg', 53.00, 3);
INSERT INTO `cf_goods_shops` VALUES (57, 'CF穿越火线-弹簧数据线', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181031170614_66785.jpg', 50.00, 3);
INSERT INTO `cf_goods_shops` VALUES (58, 'CF穿越火线-迷彩手机壳', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201811/20181102162317_36222.jpg', 39.00, 3);
INSERT INTO `cf_goods_shops` VALUES (59, '穿越火线定制卫衣-白色', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181016201232_34920.jpg', 139.00, 4);
INSERT INTO `cf_goods_shops` VALUES (60, '穿越火线定制卫衣-黑色', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181016201421_98025.jpg', 139.00, 4);
INSERT INTO `cf_goods_shops` VALUES (61, '穿越火线定制Tee-白色', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181010183853_68310.jpg', 79.00, 4);
INSERT INTO `cf_goods_shops` VALUES (62, '穿越火线定制Tee-黑色', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181010184523_41745.jpg', 79.00, 4);
INSERT INTO `cf_goods_shops` VALUES (63, '穿越火线定制卫衣-黑色', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181016201421_98025.jpg', 139.00, 4);
INSERT INTO `cf_goods_shops` VALUES (64, 'M4A1-黑骑士 英雄级手办模型', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201910/20191031171203_25189.jpg', 258.00, 5);
INSERT INTO `cf_goods_shops` VALUES (65, '王者之心 手办模型', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201904/20190404190403_42112.jpg', 258.00, 5);
INSERT INTO `cf_goods_shops` VALUES (66, 'M4A1-雷神 英雄级手办模型', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190621194650_83046.jpg', 298.00, 5);
INSERT INTO `cf_goods_shops` VALUES (67, '巴雷特-毁灭 英雄级手办模型', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190916175258_97104.jpg', 298.00, 5);
INSERT INTO `cf_goods_shops` VALUES (68, '审判者Q版手办-潜伏者【全款预售】', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201911/20191112190040_40410.jpg', 69.00, 5);
INSERT INTO `cf_goods_shops` VALUES (69, '灵狐者Q版手办组合【已预订玩家补款】', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190927105645_70089.jpg', 20.00, 5);
INSERT INTO `cf_goods_shops` VALUES (70, '灵狐者Q版手办-潜伏者【全款预售】', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190912192721_88980.jpg', 69.00, 5);
INSERT INTO `cf_goods_shops` VALUES (71, 'CF手办模型-刀锋+白狼套装', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201905/20190509141201_71157.jpg', 218.00, 5);
INSERT INTO `cf_goods_shops` VALUES (72, '王者之魄 周年限量收藏款【已售罄】', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201909/20190902114432_41933.jpg', 888.00, 5);
INSERT INTO `cf_goods_shops` VALUES (73, 'CF穿越火线毛绒公仔-伏地魔', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181025172942_76032.jpg', 35.10, 5);
INSERT INTO `cf_goods_shops` VALUES (74, 'CF穿越火线毛绒公仔-小沃头', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201810/20181025132540_46492.jpg', 24.00, 5);
INSERT INTO `cf_goods_shops` VALUES (75, 'CF元首铁骑限量手办', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201812/20181225114838_78646.jpg', 1988.00, 5);
INSERT INTO `cf_goods_shops` VALUES (76, 'CF穿越火线超级SD公仔', 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201807/20180724191700_24121.jpg', 88.00, 5);

-- ----------------------------
-- Table structure for cf_image_details
-- ----------------------------
DROP TABLE IF EXISTS `cf_image_details`;
CREATE TABLE `cf_image_details`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `details_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `details_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品路径',
  `cf_goods_shops_id` int(255) NULL DEFAULT NULL COMMENT '对应商品的id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_image_details
-- ----------------------------
INSERT INTO `cf_image_details` VALUES (1, 'https://shp.qpic.cn/mall/0/goods_cf_201906195147_28444/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (2, 'https://shp.qpic.cn/mall/0/goods_cf_201906195147_61231/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (3, 'https://shp.qpic.cn/mall/0/goods_cf_201906195147_38126/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (4, 'https://shp.qpic.cn/mall/0/goods_cf_201906195148_12827/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (5, 'https://shp.qpic.cn/mall/0/goods_cf_201906195148_99633/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (6, 'https://shp.qpic.cn/mall/0/goods_cf_201906195149_12296/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (7, 'https://shp.qpic.cn/mall/0/goods_cf_201906195149_38649/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (8, 'https://shp.qpic.cn/mall/0/goods_cf_201906195150_59281/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (9, 'https://shp.qpic.cn/mall/0/goods_cf_201906195150_10297/0.jpg', NULL, 1);
INSERT INTO `cf_image_details` VALUES (10, 'https://shp.qpic.cn/mall/0/goods_cf_201906180118_13751/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (11, 'https://shp.qpic.cn/mall/0/goods_cf_201906180118_49340/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (12, 'https://shp.qpic.cn/mall/0/goods_cf_201906180118_12345/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (13, 'https://shp.qpic.cn/mall/0/goods_cf_201906180119_16311/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (14, 'https://shp.qpic.cn/mall/0/goods_cf_201906180120_10113/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (15, 'https://shp.qpic.cn/mall/0/goods_cf_201906180120_13321/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (16, 'https://shp.qpic.cn/mall/0/goods_cf_201906190540_85193/0.jpg', NULL, 2);
INSERT INTO `cf_image_details` VALUES (17, 'https://shp.qpic.cn/mall/0/goods_cf_201906180459_71593/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (18, 'https://shp.qpic.cn/mall/0/goods_cf_201906180459_11172/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (19, 'https://shp.qpic.cn/mall/0/goods_cf_201906180459_91837/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (20, 'https://shp.qpic.cn/mall/0/goods_cf_201906180500_52650/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (21, 'https://shp.qpic.cn/mall/0/goods_cf_201906180500_91163/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (22, 'https://shp.qpic.cn/mall/0/goods_cf_201906180501_67902/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (23, 'https://shp.qpic.cn/mall/0/goods_cf_201906180502_76112/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (24, 'https://shp.qpic.cn/mall/0/goods_cf_201906190426_23159/0.jpg', NULL, 3);
INSERT INTO `cf_image_details` VALUES (25, 'https://shp.qpic.cn/mall/0/goods_cf_201906175748_37801/0.jpg', NULL, 4);
INSERT INTO `cf_image_details` VALUES (26, 'https://shp.qpic.cn/mall/0/goods_cf_201906175748_23626/0.jpg', NULL, 4);
INSERT INTO `cf_image_details` VALUES (27, 'https://shp.qpic.cn/mall/0/goods_cf_201906175748_24100/0.jpg', NULL, 4);
INSERT INTO `cf_image_details` VALUES (28, 'https://shp.qpic.cn/mall/0/goods_cf_201906175750_79166/0.jpg', NULL, 4);
INSERT INTO `cf_image_details` VALUES (29, 'https://shp.qpic.cn/mall/0/goods_cf_201906175750_46552/0.jpg', NULL, 4);
INSERT INTO `cf_image_details` VALUES (30, 'https://shp.qpic.cn/mall/0/goods_cf_201906175750_11825/0.jpg', NULL, 4);
INSERT INTO `cf_image_details` VALUES (31, 'https://shp.qpic.cn/mall/0/goods_cf_201906190642_12734/0.jpg', NULL, 4);

-- ----------------------------
-- Table structure for cf_image_lunbo
-- ----------------------------
DROP TABLE IF EXISTS `cf_image_lunbo`;
CREATE TABLE `cf_image_lunbo`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品描述',
  `goods_image_lunbo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品轮播图片',
  `cf_goods_shops_id` int(11) NULL DEFAULT NULL COMMENT '商品id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_image_lunbo
-- ----------------------------
INSERT INTO `cf_image_lunbo` VALUES (1, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184412_98890.jpg', 1);
INSERT INTO `cf_image_lunbo` VALUES (2, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617175417_54238.jpg', 1);
INSERT INTO `cf_image_lunbo` VALUES (3, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617175417_41943.jpg', 1);
INSERT INTO `cf_image_lunbo` VALUES (4, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617175417_68642.jpg', 1);
INSERT INTO `cf_image_lunbo` VALUES (5, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184455_78192.jpg', 2);
INSERT INTO `cf_image_lunbo` VALUES (6, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617180339_78508.jpg', 2);
INSERT INTO `cf_image_lunbo` VALUES (7, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617180339_39298.jpg', 2);
INSERT INTO `cf_image_lunbo` VALUES (8, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617180339_89493.jpg', 2);
INSERT INTO `cf_image_lunbo` VALUES (9, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184529_34697.jpg', 3);
INSERT INTO `cf_image_lunbo` VALUES (10, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190618145205_82703.jpg', 3);
INSERT INTO `cf_image_lunbo` VALUES (11, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617180514_98431.jpg', 3);
INSERT INTO `cf_image_lunbo` VALUES (12, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617180514_60312.jpg', 3);
INSERT INTO `cf_image_lunbo` VALUES (13, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201907/20190719184603_78532.jpg', 4);
INSERT INTO `cf_image_lunbo` VALUES (14, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617175652_99794.jpg', 4);
INSERT INTO `cf_image_lunbo` VALUES (15, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617175652_32934.jpg', 4);
INSERT INTO `cf_image_lunbo` VALUES (16, NULL, 'https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201906/20190617175653_83655.jpg', 4);

-- ----------------------------
-- Table structure for cf_orders
-- ----------------------------
DROP TABLE IF EXISTS `cf_orders`;
CREATE TABLE `cf_orders`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户订单id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(3) NULL DEFAULT NULL COMMENT '订单状态 0:未支付 1:已支付',
  `addtime` int(11) NOT NULL COMMENT '下单时间',
  `order_sn` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单号',
  `shr_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人姓名',
  `shr_mobile` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人电话',
  `shr_province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '省',
  `shr_city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '市',
  `shr_area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区',
  `shr_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '详细地址',
  `shr_zipcode` int(10) NOT NULL COMMENT '邮编',
  `total_price` decimal(10, 2) NOT NULL COMMENT '总价',
  `post_order_sn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发货的快递号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cf_orders_goods
-- ----------------------------
DROP TABLE IF EXISTS `cf_orders_goods`;
CREATE TABLE `cf_orders_goods`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL COMMENT '商品的id',
  `buy_count` tinyint(3) NOT NULL COMMENT '购买数量',
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `price` decimal(10, 2) NOT NULL COMMENT '购买的成交价格',
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `goods_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cf_title
-- ----------------------------
DROP TABLE IF EXISTS `cf_title`;
CREATE TABLE `cf_title`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cf_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类图标',
  `cf_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类标题',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_title
-- ----------------------------
INSERT INTO `cf_title` VALUES (1, 'https://game.gtimg.cn/images/daojushop/zb/ad/201804/20180418185604_380700.png', '全部周边');
INSERT INTO `cf_title` VALUES (2, 'https://game.gtimg.cn/images/daojushop/zb/ad/201804/20180418185619_958204.png', '新品尝鲜');
INSERT INTO `cf_title` VALUES (3, 'https://game.gtimg.cn/images/daojushop/zb/ad/201804/20180418185631_605018.png', '人气爆款');
INSERT INTO `cf_title` VALUES (4, 'https://game.gtimg.cn/images/daojushop/zb/ad/201804/20180418185644_145108.png', '生活用品');

-- ----------------------------
-- Table structure for cf_users
-- ----------------------------
DROP TABLE IF EXISTS `cf_users`;
CREATE TABLE `cf_users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cf_username` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户手机号码',
  `cf_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '用户创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_users
-- ----------------------------
INSERT INTO `cf_users` VALUES (1, '13211111111', '93d0d3f91e02624f3531e86aca384f0a', 1574042419);
INSERT INTO `cf_users` VALUES (2, '15411111111', '93d0d3f91e02624f3531e86aca384f0a', 1574042696);
INSERT INTO `cf_users` VALUES (3, '15984775637', '93d0d3f91e02624f3531e86aca384f0a', 1574042803);
INSERT INTO `cf_users` VALUES (4, '15611111111', '93d0d3f91e02624f3531e86aca384f0a', 1574042835);

-- ----------------------------
-- Table structure for cf_wheel
-- ----------------------------
DROP TABLE IF EXISTS `cf_wheel`;
CREATE TABLE `cf_wheel`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cf_wheelplantingname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '轮播图名字',
  `cf_wheelplantingurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '轮播图名字链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cf_wheel
-- ----------------------------
INSERT INTO `cf_wheel` VALUES (1, 'https://game.gtimg.cn/images/daojushop/zb/ad/201911/20191108194055_402638.jpg', NULL);
INSERT INTO `cf_wheel` VALUES (2, 'https://game.gtimg.cn/images/daojushop/zb/ad/201908/20190801100342_229406.jpg', NULL);

SET FOREIGN_KEY_CHECKS = 1;

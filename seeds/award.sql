/*
 Navicat Premium Data Transfer

 Source Server         : PostgreSQL Local
 Source Server Type    : PostgreSQL
 Source Server Version : 100004
 Source Host           : localhost:5432
 Source Catalog        : angular
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100004
 File Encoding         : 65001

 Date: 12/07/2023 09:44:55
*/


-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS "award";
CREATE TABLE "award" (
  "id" SERIAL,
  "type" varchar(20) COLLATE "pg_catalog"."default",
  "point" int,
  "image" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default"
);

ALTER SEQUENCE award_id_seq RESTART WITH 5;

-- ----------------------------
-- Records of branch
-- ----------------------------
INSERT INTO "award" VALUES (1, 'vouchers',500000,'voucher.jpg','voucher aja');
INSERT INTO "award" VALUES (2, 'products',5000,'products.jpg','products aja');
INSERT INTO "award" VALUES (3, 'giftcards',10000,'giftcards.jpg','giftcards aja');
INSERT INTO "award" VALUES (4, 'vouchers',200000,'voucher2.jpg','voucher2 aja');
INSERT INTO "award" VALUES (5, 'vouchers',500000,'voucher.jpg','voucher aja');
INSERT INTO "award" VALUES (6, 'products',5000,'products.jpg','products aja');
INSERT INTO "award" VALUES (7, 'giftcards',10000,'giftcards.jpg','giftcards aja');
INSERT INTO "award" VALUES (8, 'vouchers',200000,'voucher2.jpg','voucher2 aja');
INSERT INTO "award" VALUES (9, 'vouchers',500000,'voucher.jpg','voucher aja');
INSERT INTO "award" VALUES (10, 'products',5000,'products.jpg','products aja');
INSERT INTO "award" VALUES (11, 'giftcards',10000,'giftcards.jpg','giftcards aja');
INSERT INTO "award" VALUES (12, 'vouchers',200000,'voucher2.jpg','voucher2 aja');
INSERT INTO "award" VALUES (13, 'vouchers',500000,'voucher.jpg','voucher aja');
INSERT INTO "award" VALUES (14, 'products',5000,'products.jpg','products aja');
INSERT INTO "award" VALUES (15, 'giftcards',10000,'giftcards.jpg','giftcards aja');
INSERT INTO "award" VALUES (16, 'vouchers',200000,'voucher2.jpg','voucher2 aja');

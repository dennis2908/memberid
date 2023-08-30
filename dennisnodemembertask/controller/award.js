const path = require("path");
var async = require("async");
var flash = require("express-flash-messages");
const express = require("express");
const app = express();
var async = require("async");

const format = require("pg-format");
const pool = require("../database.js");

exports.get_data = async function (req, res) {
  var searchdata = "";

  if (req.query) {
    if (typeof req.query.type !== "undefined")
      searchdata = "where type like '%" + req.query.type + "%'";
    if (typeof req.query.point !== "undefined") {
      if (searchdata !== "")
        searchdata += " AND point like '%" + req.query.point + "%'";
      else searchdata = "where point like '%" + req.query.point + "%'";
    }
    if (typeof req.query.name !== "undefined") {
      if (searchdata !== "")
        searchdata += " AND name like '%" + req.query.name + "%'";
      else searchdata = "where name like '%" + req.query.name + "%'";
    }
    if (typeof req.query.image !== "undefined") {
      if (searchdata !== "")
        searchdata += " AND image like '%" + req.query.image + "%'";
      else searchdata = "where image like '%" + req.query.image + "%'";
    }
  }
  if (parseInt(req.params.offset) < 0) req.params.offset = 0;

  let _sql_rest_url =
    "SELECT * from award " +
    searchdata +
    ascdesc +
    " limit " +
    req.params.limit +
    " offset " +
    req.params.offset;
  var rows = await pool.query(_sql_rest_url);
  res.json(rows.rows);
};

exports.get_data_by_id = async function (req, res) {
  if (typeof req.params.id !== "undefined") {
    var _sql_rest_url = "SELECT * from award where id = " + req.params.id;
    var rows = await pool.query(_sql_rest_url);
    res.json(rows.rows[0]);
  }
};

exports.get_all_data = async function (req, res) {
  var searchdata = "";
  let type = "";
  if (req.query) {
    if (typeof req.query.vouchers !== "undefined") {
      if (req.query.vouchers) type += "'" + "vouchers" + "',";
    }
    if (typeof req.query.others !== "undefined") {
      if (req.query.others) type += "'" + "giftcards" + "',";
    }
    if (typeof req.query.products !== "undefined") {
      if (req.query.products) type += "'" + "products" + "',";
    }
    if (type) searchdata = "where type in (" + type.slice(0, -1) + ")";

    if (typeof req.query.alltype !== "undefined") {
      if (req.query.alltype) searchdata = "";
    }
    if (typeof req.query.point !== "undefined") {
      if (searchdata !== "") searchdata += " AND point <= " + req.query.point;
      else searchdata = "where point <= " + req.query.point;
    }
  }
  if (parseInt(req.params.offset) < 0) req.params.offset = 0;

  let _sql_rest_url =
    "SELECT * from award " +
    searchdata +
    " limit " +
    req.params.limit +
    " offset " +
    req.params.offset;
  console.log(_sql_rest_url);
  var rows = await pool.query(_sql_rest_url);
  res.json(rows.rows);
};

const path = require("path");
var flash = require("express-flash-messages");
const express = require("express");
var async = require("async");
const pool = require("../database.js");

const jwt = require("jsonwebtoken");

exports.doLogin = async function (req, res) {
  let _sql_rest_url =
    "SELECT users.*,role_name,role_assign from users join role on role.id = users.m_role where email = '" +
    req.body.email +
    "'";
  var rows = await pool.query(_sql_rest_url);
  if (Object.keys(rows.rows).length > 0) {
    let token = jwt.sign({ rows }, "secretkeyappearshere", {
      expiresIn: "1000d"
    });
    rows.rows[0]["token"] = token;
    res.json(rows.rows[0]);
  } else res.json(false);
};

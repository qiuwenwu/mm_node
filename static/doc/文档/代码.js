      /// <summary>
        /// 删除重复记录并留唯一
        /// </summary>
        /// <param name="whereStr">删除的条件语句</param>
        /// <param name="field">用作判断的字段</param>
        /// <param name="IDfield">ID字段</param>
        /// <param name="keep">保留方式，max或min</param>
        /// <returns>删除成功返回true，失败返回false</returns>
        public bool DelAsOne(string whereStr, string field, string IDfield, string keep = "max")
        {
            string sql = string.Format("DELETE FROM `{0}` WHERE `{3}` NOT IN (SELECT minid FROM (SELECT {4}(`{3}`) AS minid FROM `{0}` GROUP BY {1}) b) AND {2};", Table, field, whereStr, IDfield, keep);
            return Execute(sql);
        }
		
		  /// <summary>
        /// 创建表
        /// </summary>
        /// <returns>创建成功返回ture，失败返回false</returns>
        public bool DelTable()
        {
            string sql = string.Format("DROP TABLE IF EXISTS `{0}`; ", Table);
            int num = Executes(sql);
            if (num == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
		
		/// <summary>
        /// 将json转Sql语句
        /// </summary>
        /// <param name="obj">对象</param>
        /// <param name="likeParamArr">需要like匹配的参数</param>
        /// <param name="fh">链接符号</param>
        /// <returns>返回Sql语句字符串</returns>
        public string ToSql(object obj, string likeParamArr = "", string fh = " and ")
        {
            if (obj == null)
            {
                return "";
            }
            var sql = "";
            try
            {
                JObject json = null;
                if (obj.GetType().Name == "String")
                {
                    json = JObject.Parse((string)obj);
                }
                else
                {
                    json = JObject.FromObject(obj);
                }
                sql = ToSql(json, likeParamArr, fh);
            }
            catch (Exception ex)
            {
                Ex = ex.ToString();
            }
            return sql;
        }

        /// <summary>
        /// 将json转Sql语句
        /// </summary>
        /// <param name="json">json对象</param>
        /// <param name="likeParamArr">需要like匹配的参数</param>
        /// <param name="fh">链接符号</param>
        /// <returns>返回Sql语句字符串</returns>
        public string ToSql(JObject json, string likeParamArr, string fh)
        {
            if (json == null)
            {
                return "";
            }
            var sql = "";
            if (likeParamArr != null)
            {
                var arr = likeParamArr.Split(',');
                foreach (var p in arr)
                {
                    if (json.TryGetValue(p, out JToken o))
                    {
                        sql += fh + "`" + p + "` like " + "'%" + o + "%'";
                        json.Remove(p);
                    }
                }
            }
            foreach (var ke in json)
            {
                var key = ke.Key;
                if (ke.Value != null)
                {
                    var value = ke.Value.ToString();
                    if (int.TryParse(value, out int n))
                    {
                        sql += fh + "`" + key + "` = " + value;
                    }
                    else
                    {
                        sql += fh + "`" + key + "` = '" + value + "'";
                    }
                }
            }
            if (!string.IsNullOrEmpty(fh))
            {
                sql = sql.Substring(sql.IndexOf(fh) + fh.Length);
            }
            return sql;
        }

        /// <summary>
        /// 转为Sql添加语句
        /// </summary>
        /// <param name="param">参数</param>
        /// <param name="updateDt">添加的条件</param>
        /// <returns>返回添加语句</returns>
        public string ToSqlAdd(JObject param, Dictionary<string, string> updateDt)
        {
            var keys = "";
            var values = "";
            if (updateDt != null)
            {
                foreach (var o in param)
                {
                    var key = o.Key;
                    var value = o.Value;
                    if (value != null)
                    {
                        if (updateDt.ContainsKey(key))
                        {
                            var arr = updateDt[key].Split('=');
                            if (arr.Length == 2)
                            {
                                keys += ", " + string.Format(arr[0], key);
                                values += ", " + string.Format(arr[1], value);
                            }
                        }
                    }
                }
                foreach (var o in updateDt.Keys)
                {
                    param.Remove(o);
                }
            }
            foreach (var o in param)
            {
                var key = o.Key;
                var value = o.Value;
                if (value != null)
                {
                    var v = value.ToString();
                    if (int.TryParse(v, out int num))
                    {
                        keys += string.Format(", `{0}`", key);
                        values += string.Format(", {0}", v);
                    }
                    else if (bool.TryParse(v, out bool bl))
                    {
                        keys += string.Format(", `{0}`", key);
                        if (bl)
                        {
                            values += ", 1";
                        }
                        else
                        {
                            values += ", 0";
                        }
                    }
                    else
                    {
                        keys += string.Format(", `{0}`", key);
                        values += string.Format(", '{0}'", v);
                    }
                }
            }
            if (keys.StartsWith(", "))
            {
                keys = keys.Substring(2);
            }
            if (values.StartsWith(", "))
            {
                values = values.Substring(2);
            }
            var sql = "";
            if (!string.IsNullOrEmpty(keys))
            {
                sql += string.Format("({0})", keys);
            }
            if (!string.IsNullOrEmpty(values))
            {
                sql += string.Format(" VALUE ({0})", values);
            }
            return sql;
        }

        /// <summary>
        /// 转为查询语句
        /// </summary>
        /// <param name="param">查询的参数</param>
        /// <param name="whereDt">查询条件</param>
        /// <param name="separator">多条件查询分隔符</param>
        /// <returns>返回查询语句</returns>
        public string ToSqlGet(JObject param, Dictionary<string, string> whereDt, string separator = "|")
        {
            var where = "";
            if (whereDt != null)
            {
                foreach (var o in param)
                {
                    var key = o.Key;
                    var value = o.Value;
                    if (value != null)
                    {
                        if (whereDt.ContainsKey(key))
                        {
                            where += LinkWhere(whereDt[key], value.ToString(), separator);
                        }
                    }
                }
                foreach (var o in whereDt.Keys)
                {
                    param.Remove(o);
                }
            }
            foreach (var o in param)
            {
                var key = o.Key;
                if (o.Value != null)
                {
                    var value = o.Value.ToString();
                    if (int.TryParse(value, out int num))
                    {
                        where += string.Format(" && `{0}`={1}", key, value);
                    }
                    else if (bool.TryParse(value, out bool bl))
                    {
                        if (bl)
                        {
                            where += string.Format(" && `{0}`=1", key);
                        }
                        else
                        {
                            where += string.Format(" && `{0}`=0", key);
                        }
                    }
                    else
                    {
                        where += LinkWhere("`" + key + "`='{0}'", value, separator);
                    }
                }
            }
            if (where.StartsWith(" && "))
            {
                where = where.Substring(4);
            }

            var sql = "";
            if (!string.IsNullOrEmpty(where))
            {
                sql += "WHERE " + where;
            }
            return sql;
        }

        /// <summary>
        /// 转为修改语句
        /// </summary>
        /// <param name="param">修改的参数</param>
        /// <param name="whereDt">修改的前提条件</param>
        /// <param name="updateDt">修改数据为</param>
        /// <param name="separator">多条件分隔符</param>
        /// <returns>返回修改mysql语句</returns>
        public string ToSqlSet(JObject param, Dictionary<string, string> whereDt = null, Dictionary<string, string> updateDt = null, string separator = "|")
        {
            var where = "";
            var update = "";
            if (whereDt != null && updateDt != null)
            {
                foreach (var o in param)
                {
                    var key = o.Key;
                    var value = o.Value;
                    if (value != null)
                    {
                        if (updateDt.ContainsKey(key))
                        {
                            update += ", " + string.Format(updateDt[key], value);
                        }
                        else if (whereDt.ContainsKey(key))
                        {
                            where += LinkWhere(whereDt[key], value.ToString(), separator);
                        }
                    }
                }
                foreach (var o in whereDt.Keys)
                {
                    param.Remove(o);
                }
                foreach (var o in updateDt.Keys)
                {
                    param.Remove(o);
                }
            }
            else if (whereDt != null)
            {
                foreach (var o in param)
                {
                    var key = o.Key;
                    var value = o.Value;
                    if (value != null)
                    {
                        if (whereDt.ContainsKey(key))
                        {
                            where += LinkWhere(whereDt[key], value.ToString(), separator);
                        }
                    }
                }
                foreach (var o in whereDt.Keys)
                {
                    param.Remove(o);
                }
            }
            else if (updateDt != null)
            {
                foreach (var o in param)
                {
                    var key = o.Key;
                    var value = o.Value;
                    if (value != null)
                    {
                        if (updateDt.ContainsKey(key))
                        {
                            update += ", " + string.Format(updateDt[key], value);
                        }
                    }
                }
                foreach (var o in updateDt.Keys)
                {
                    param.Remove(o);
                }
            }
            foreach (var o in param)
            {
                var key = o.Key;
                var value = o.Value.ToString();
                if (value != null)
                {
                    if (int.TryParse(value, out int num))
                    {
                        update += string.Format(", `{0}`={1}", key, value);
                    }
                    else if (bool.TryParse(value, out bool bl))
                    {
                        if (bl)
                        {
                            update += string.Format(", `{0}`=1", key);
                        }
                        else
                        {
                            update += string.Format(", `{0}`=0", key);
                        }
                    }
                    else
                    {
                        update += string.Format(", `{0}`='{1}'", key, value);
                    }
                }
            }

            if (update.StartsWith(", "))
            {
                update = update.Substring(2);
            }
            if (where.StartsWith(" && "))
            {
                where = where.Substring(4);
            }

            var sql = "";
            if (!string.IsNullOrEmpty(update))
            {
                sql += "SET " + update;
            }
            if (!string.IsNullOrEmpty(where))
            {
                sql += " WHERE " + where;
            }
            return sql;
        }

        private string LinkWhere(string sql, string str, string separator)
        {
            var where = "";
            if (!string.IsNullOrEmpty(str))
            {
                if (str.Contains(separator))
                {
                    var n = "";
                    var arr = str.Split(separator.ToCharArray());
                    foreach (var a in arr)
                    {
                        n += " || " + string.Format(sql, a);
                    }
                    where += " && (" + n.Substring(4) + ")";
                }
                else
                {
                    where += " && " + string.Format(sql, str);
                }
            }
            return where;
        }

        /// <summary>
        /// 获取表中所有字段信息
        /// </summary>
        /// <param name="table">表名</param>
        /// <param name="fieldName">字段名</param>
        /// <returns>获取成功返回表信息，获取失败返回false</returns>
        public string GetField(string table = "",  string fieldName = "")
        {
            if (string.IsNullOrEmpty(table))
            {
                table = Table;
            }
            if (!string.IsNullOrEmpty(table))
            {
                if (!string.IsNullOrEmpty(fieldName))
                {
                    fieldName = string.Format(" && COLUMN_NAME = '{0}'", fieldName);
                }
                return Query(string.Format("SELECT COLUMN_NAME as `name`,COLUMN_TYPE as `type`, COLUMN_KEY as `key`, COLUMN_DEFAULT as `default`,COLUMN_COMMENT as `comment` FROM information_schema.columns WHERE table_schema='{0}' && TABLE_NAME='{1}'{2}", Database, table, fieldName));
            }
            return "[]";
        }

        /// <summary>
        /// 获取所有表名
        /// </summary>
        /// <returns>获取成功返回所有表明，获取失败返回false</returns>
        public string GetTables()
        {
            return Query(string.Format("select table_name as `table` from information_schema.tables where table_schema='{0}' && table_type='base table';", Database));
        }
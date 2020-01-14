var analyse = 

/**
 * 导入公式
 */
async import_formula(db, list) {
	db.table = "finance_formula";
	for (var i = 0, o = list[i++];) {
		db.addOrSet({
			name: o.name
		}, o);
	}
}

/**
 * 导出公式
 */
async export_formula(db) {
	db.table = "finance_formula";
	return await db.get();
}

/**
 * 提取公式
 */
async draw_formula(db) {
	db.table = "finance_formula";
}
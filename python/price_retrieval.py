import datetime
import warnings
import MySQLdb as mdb
import requests
import quandl
from passwords import PASSWORD, API_KEY


# Authenticate Session
quandl.ApiConfig.api_key = API_KEY

# Obtain a database connection to the MySQL instance
db_host = 'localhost'
db_user = 'user'
db_pass = PASSWORD
db_name = 'financial_db'
con = mdb.connect(db_host, db_user, db_pass, db_name)


"""
Obtains a list of the S&P500 ticker symbols from the database.
"""
def obtain_list_of_db_tickers():
	with con: 
		cur = con.cursor()
		cur.execute("SELECT id, ticker FROM symbol")
		data = cur.fetchall()
		return [(d[0], d[1]) for d in data]


"""
Obtains Quandl data and returns a list of tuples.
"""
def get_daily_historic_data_quandl(
		ticker, start_date=(2000,1,1),
		end_date=datetime.date.today().timetuple()[0:3]
	):

	ticker_tup = (
		ticker, start_date[0], start_date[1], start_date[2], 
		end_date[0], end_date[1], end_date[2], API_KEY
	)
	url = "https://www.quandl.com/api/v3/datasets/WIKI/"
	url += "%s.json?start_date=%s-%s-%s&end_date=%s-%s-%s&api_key=%s" % ticker_tup

	# Try connecting to Quandl and obtaining the data
	# On failure, print an error message.
	try:
		data = quandl.get(
				"WIKI/{}".format(ticker.replace(".", "_")),
				start_date=str(start_date[0]) + '-' + str(start_date[1]) + '-' + str(start_date[2]),
				end_date=str(end_date[0]) + '-' + str(end_date[1]) + '-' + str(end_date[2]),
				returns="numpy"
			)
		prices = []
		for i in range(len(data)):
			date = data[i][0]
			Open = data[i][1]
			high = data[i][2]
			low = data[i][3]
			close = data[i][4] 
			volume = data[i][5]
			adj_open = data[i][8]
			adj_high = data[i][9]
			adj_low = data[i][10]
			adj_close = data[i][11]
			prices.append( 
				(date.date(), Open, high, low, close, volume,
					adj_open, adj_high, adj_low, adj_close) 
			)

	except Exception as e:
		print("Could not download Quandl data: %s" % e)
	return prices


"""
Takes a list of tuples of daily data and adds it to the
MySQL database. Appends the vendor ID and symbol ID to the data.

daily_data: List of tuples of the OHLC data (with 
adj_ohlc and volume)
"""
def insert_daily_data_into_db(data_vendor_id, symbol_id, daily_data):

	# Create the time now
	now = datetime.datetime.utcnow()

	# Amend the data to include the vendor ID and symbol ID
	daily_data = [
		(data_vendor_id, symbol_id, d[0], now, now,
		d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9]) 
		for d in daily_data
	]

	# Create the insert strings
	column_str = "data_vendor_id, symbol_id, price_date, created_date, last_updated_date, open_price, high_price, low_price, close_price, adj_open_price, adj_high_price, adj_low_price, adj_close_price, volume"
	insert_str = ("%s, " * 14)[:-2]
	final_str = "INSERT INTO daily_price (%s) VALUES (%s)" % (column_str, insert_str)

	# Using the MySQL connection, carry out an INSERT INTO for every symbol
	with con:
		cur = con.cursor()
		cur.executemany(final_str, daily_data)


if __name__ == "__main__":

	# This ignores the warnings regarding Data Truncation
	warnings.filterwarnings('ignore')

	# Loop over the tickers and insert the daily historical data into the database
	tickers = obtain_list_of_db_tickers()
	lentickers = len(tickers)
	for i, t in enumerate(tickers):
		print(
			"Adding data for %s: %s out of %s" % 
			(t[1], i+1, lentickers)
		)
		quandl_data = get_daily_historic_data_quandl(t[1])
		insert_daily_data_into_db('1', t[0], quandl_data)

	print("Successfully added Quandl pricing data to DB.")
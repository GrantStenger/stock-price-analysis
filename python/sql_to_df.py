import pandas as pd
import MySQLdb as mdb
import matplotlib.pyplot as plt
from passwords import PASSWORD

# Grabs relevant data from MySQL and converts to a pandas dataframe
def retrieve_data(ticker):

	# Connect to the MySQL instance
	db_host = 'localhost'
	db_user = 'user'
	db_pass = PASSWORD
	db_name = 'financial_db'
	con = mdb.connect(db_host, db_user, db_pass, db_name)

	# Select all of the historic Google adjusted close data
	sql = "SELECT dp.price_date, dp.adj_open_price, dp.adj_close_price, dp.adj_high_price, dp.adj_low_price \n"
	sql += "FROM symbol AS sym \n"
	sql += "INNER JOIN daily_price AS dp \n"
	sql += "ON dp.symbol_id = sym.id \n"
	sql += "WHERE sym.ticker = '%s' \n" % ticker
	sql += "ORDER BY dp.price_date ASC;"

	# Create a pandas dataframe from the SQL query
	df = pd.read_sql_query(sql, con=con, index_col='price_date')
	return df


if __name__ == "__main__":

	# Retrieve Data
	ticker = retrieve_data("AAPL")

	# Print DataFrame
	print(ticker)

	# Plot the Data
	ticker['adj_close_price'].plot()
	ticker['open_price'].plot()
	ticker['close_price'].plot()
	plt.legend(loc=4)
	plt.xlabel('Date')
	plt.ylabel('Price')
	plt.show()

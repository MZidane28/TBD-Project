import json
import numpy as np
import matplotlib.pyplot as plt

# Baca data pengukuran dari file JSON
with open('src/Book/api_times.json', 'r') as f:
    api_data = json.load(f)

with open('src/Book/sql_times.json', 'r') as f:
    sql_data = json.load(f)

# Ambil times
api_times = api_data
sql_times = sql_data

# Menghitung standar deviasi dari data
std_dev_api = np.std(api_times)
std_dev_sql = np.std(sql_times)

# Plot data dengan error-bars
plt.figure(figsize=(10, 6))
plt.errorbar(range(1, len(api_times) + 1), api_times, yerr=std_dev_api, fmt='o', label='API Execution Time with Error Bars', capsize=10)
plt.errorbar(range(1, len(sql_times) + 1), sql_times, yerr=std_dev_sql, fmt='o', label='Direct SQL Execution Time with Error Bars', capsize=10)

# Menambahkan label dan judul
plt.xlabel('Measurement Number')
plt.ylabel('Execution Time (milliseconds)')
plt.title('SQL Execution Time Comparison')
plt.legend()

# Menampilkan grafik
plt.show()

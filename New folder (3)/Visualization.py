import matplotlib.pyplot as plt
import numpy as np

# Data
countries = [
    'Greece', 'Israel', 'Italy', 'Austria', 'France', 'Belgium', 'Spain', 
    'Finland', 'Germany', 'Netherlands', 'England', 'United States', 
    'Sweden', 'Switzerland', 'Denmark'
]
percentages = [62, 48, 47, 46, 45, 42, 40, 39, 37, 35, 33, 30, 30, 26, 25]
years = [2005, 2005, 2005, 2005, 2005, 2005, 2005, 2002, 2005, 2005, 2018, 2018, 2005, 2005, 2005]

# Sort by percentages for better visualization
sorted_indices = np.argsort(percentages)
countries = np.array(countries)[sorted_indices]
percentages = np.array(percentages)[sorted_indices]
years = np.array(years)[sorted_indices]

# Bar plot
plt.figure(figsize=(12, 8))
bars = plt.barh(countries, percentages, color='skyblue')

# Annotate bars with percentages and years
for bar, percentage, year in zip(bars, percentages, years):
    plt.text(bar.get_width() + 1, bar.get_y() + bar.get_height() / 2, f'{percentage}% in {year}', va='center', ha='left')

# Labels and title
plt.xlabel('Percentage of Self-Reported Loneliness')
plt.title('Self-Reported Loneliness Among Older Adults')

# Show plot
plt.grid(axis='x')
plt.show()

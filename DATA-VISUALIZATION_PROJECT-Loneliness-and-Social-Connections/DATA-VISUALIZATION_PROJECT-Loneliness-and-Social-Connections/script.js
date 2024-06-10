const data = [
    {country: 'Greece', percentage: 62, year: 2005},
    {country: 'Israel', percentage: 48, year: 2005},
    {country: 'Italy', percentage: 47, year: 2005},
    {country: 'Austria', percentage: 46, year: 2005},
    {country: 'France', percentage: 45, year: 2005},
    {country: 'Belgium', percentage: 42, year: 2005},
    {country: 'Spain', percentage: 40, year: 2005},
    {country: 'Finland', percentage: 39, year: 2002},
    {country: 'Germany', percentage: 37, year: 2005},
    {country: 'Netherlands', percentage: 35, year: 2005},
    {country: 'England', percentage: 33, year: 2018},
    {country: 'United States', percentage: 30, year: 2018},
    {country: 'Sweden', percentage: 30, year: 2005},
    {country: 'Switzerland', percentage: 26, year: 2005},
    {country: 'Denmark', percentage: 25, year: 2005},
];

const countries = data.map(d => d.country);
const percentages = data.map(d => d.percentage);
const years = data.map(d => `${d.percentage}% in ${d.year}`);

// Generate different colors for each bar
const colors = [
    'rgb(31, 119, 180)', 'rgb(255, 127, 14)', 'rgb(44, 160, 44)', 
    'rgb(214, 39, 40)', 'rgb(148, 103, 189)', 'rgb(140, 86, 75)', 
    'rgb(227, 119, 194)', 'rgb(127, 127, 127)', 'rgb(188, 189, 34)', 
    'rgb(23, 190, 207)', 'rgb(174, 199, 232)', 'rgb(255, 187, 120)', 
    'rgb(152, 223, 138)', 'rgb(255, 152, 150)', 'rgb(197, 176, 213)'
];

const trace = {
    x: percentages,
    y: countries,
    text: years,
    textposition: 'outside',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: colors,
        line: {
            color: 'blue',
            width: 1.5
        }
    }
};

const layout = {
    title: 'Self-Reported Loneliness Among Older Adults',
    xaxis: { title: 'Percentage of Self-Reported Loneliness' },
    yaxis: { automargin: true },
    margin: { l: 150, r: 50, t: 50, b: 50 },
    plot_bgcolor: 'rgba(0, 0, 0, 0)', // Set plot background color to transparent
    paper_bgcolor: 'rgba(0, 0, 0, 0)', // Set paper background color to transparent
    font: {
        family: 'Arial, sans-serif', // Specify font family
        size: 14, // Specify font size
        color: 'black' // Specify font color
    }
};

Plotly.newPlot('chart', [trace], layout);

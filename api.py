import requests, bs4
import pandas as pd
from lxml import html 
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus, unquote
# from google.colab import drive
# drive.mount('/content/drive')

xmlUrl = 'https://www.garak.co.kr/publicdata/dataOpen.do'

a = int(input())
# a = 20211111
b = a-1
c = a-10000

queryParams = '?' + urlencode(
    {
        quote_plus('id') : '3098',
        quote_plus('passwd') : 'qkrandjs1!',
        quote_plus('dataid'): 'data4',
        quote_plus('pagesize'): '10',
        quote_plus('pageidx'): '1',
        quote_plus('portal.templet') : 'false',
        quote_plus('p_ymd') : a,
        quote_plus('p_jymd') : b,
        quote_plus('d_cd') : '2',
        quote_plus('p_jjymd') : c,
        quote_plus('p_pos_gubun') : '1',
        quote_plus('pum_nm'): '',
     
    }
)

print(xmlUrl+queryParams)

response = requests.get(xmlUrl + queryParams).text.encode('utf-8')



xmlobj = bs4.BeautifulSoup(response,'lxml-xml')

print(xmlobj)

rows = xmlobj.findAll('list')

columns = rows[0].find_all()

rowList = []
nameList = []
columnList = []

rowsLen = len(rows)
for i in range(0, rowsLen):
    columns = rows[i].find_all()
    
    columnsLen = len(columns)
    for j in range(0, columnsLen):
        if i == 0:
            nameList.append(columns[j].name)          
        eachColumn = columns[j].text
        columnList.append(eachColumn)
    rowList.append(columnList)
    columnList = []   
    
result = pd.DataFrame(rowList, columns=nameList)
# result = result.astype({'aveCost': 'int','maxCost': 'int','minCost': 'int'})
print(result.head(10))
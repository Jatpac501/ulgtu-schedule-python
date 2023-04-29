import requests
import json
from getpass import *
import time
from datetime import datetime

login = input('Введите логин >> ')
password = getpass('Введите пароль >> ')

session = requests.Session()
session.post('https://lk.ulstu.ru/?q=auth/login', data={'login': login, 'password': password})

def groups():
    response = session.get('https://time.ulstu.ru/api/1.0/groups')
    data = response.json()
    with open('data/groups.json', 'w') as f:
        json.dump(data, f)
def teachers():
    response = session.get('https://time.ulstu.ru/api/1.0/teachers')
    data = response.json()
    with open('data/teachers.json', 'w') as f:
        json.dump(data, f)
def timetable():
    response = session.get('https://time.ulstu.ru/api/1.0/timetable?filter=ИСдо-23')
    data = response.json()
    with open('data/timetable.json', 'w') as f:
        json.dump(data, f)
while True: 
    timetable()
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print(f'[{current_time}] данные обновлены')
    time.sleep(600)
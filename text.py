import os

os.system('powertop --html=process.html -time=1')



f=open("process.html","rt")


temp = 0

state_cpu = 'no'
state_power = 'no'


cpu_usage = ''
power_usage = 0

while True:
    line = f.readline()
    if not line :
        break

    if line.find('<br/><div id="main_menu"> </div>') != -1:
        state_cpu = 'ok'
    elif line.find('<h2 class="content_title"> Overview of Software Power Consumers </h2>') != -1:
        state_power = 'ok';

    if state_cpu == 'ok':
        if line.find('<li class="summary_list">') != -1:
            cpu_temp = line.split('<li class="summary_list"> <b> CPU:  </b>')
            cpu_usage = cpu_temp[1].split('</li><li class="summary_list">')[0]
            cpu_usage = float(cpu_usage.split('%')[0])
            state_cpu = 'no'
        elif line.find('<div class="clear_block" id="summary">') != -1:
            state_cpu = 'no'

    if state_power == "ok" :
        if line.find('<tr class="emph1">') != -1 & line.find('<th class="emph_title"> Usage </th> <th class="emph_title"> Wakeups/s </th> ') == -1 :
            temp =  line.split('<td class="no_wrap">')[-1]
            if temp.find('uW') != -1:
                power_uw = temp.split('uW')[0]
                print(float(power_uw),'uW')
                power_usage += float(power_uw)*0.000001
            elif temp.find('mW') != -1:
                power_mw = temp.split('mW')[0]
                print(float(power_mw),'mW')
                power_usage += float(power_mw)*0.001
            elif temp.find('W') != -1:
                power_w = temp.split('W')[0]
                print(float(power_w),'W')
                power_usage += float(power_w)
        if line.find('</table>') != -1 :
            break
print('cpu_usage = ', cpu_usage,"%")
print('power_usage = ', power_usage,"W")
f.close()

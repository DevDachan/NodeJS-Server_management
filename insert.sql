use server_management;

DELETE FROM server_list WHERE id IS NOT NULL;
DELETE FROM history WHERE id IS NOT NULL; 
INSERT INTO history VALUE("15","2022-09-23/16:54:05","30%","12");

INSERT INTO history VALUE("13","2022-09-23/16:54:05","20%","8");

INSERT INTO history VALUE("14","2022-09-23/16:54:05","70%","10");

INSERT INTO history VALUE("2","2022-09-23/16:54:05","17%","2");

INSERT INTO history VALUE("3","2022-09-23/16:54:05","92%","7");



INSERT INTO history VALUE("15","2022-09-23/16:45:05","12%","2");

INSERT INTO history VALUE("13","2022-09-23/16:45:05","60%","16");

INSERT INTO history VALUE("14","2022-09-23/16:45:05","12%","30");

INSERT INTO history VALUE("2","2022-09-23/16:45:05","99%","25");

INSERT INTO history VALUE("3","2022-09-23/16:45:05","2%","1");

INSERT INTO server_list VALUE("3","Dachan2","on");

INSERT INTO server_list VALUE("2","Dachan","off");

INSERT INTO server_list VALUE("14","Manso","on");

INSERT INTO server_list VALUE("13","Yeji","off");
INSERT INTO server_list VALUE("15","Yebin","on");


select * from history;

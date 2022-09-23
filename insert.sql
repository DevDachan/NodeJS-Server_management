use server_management;
/*
ALTER TABLE history DROP primary key;

ALTER TABLE history ADD primary key (id,time,name);
*/

DELETE FROM history where id IS NOT NULL;
INSERT INTO history VALUE("15","2022-09-23/16:54","30","Yebin","12","on");

INSERT INTO history VALUE("13","2022-09-23/16:54","20","Yeji","12","on");

INSERT INTO history VALUE("14","2022-09-23/16:54","70","Manso","12","off");

INSERT INTO history VALUE("2","2022-09-23/16:54","17","Dachan","12","on");

INSERT INTO history VALUE("3","2022-09-23/16:54","92","Dachan2","12","off");


select * from history;

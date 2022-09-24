use server_management;


select * from history;

SELECT * FROM history AS A,(SELECT id, MAX(time) as max_time FROM history GROUP BY id) AS B WHERE A.id = B.id AND A.time=B.max_time;
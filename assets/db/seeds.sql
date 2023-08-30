INSERT INTO department (id, name)
VALUES  (0001, 'Finance'),
        (0002, 'Engineering'),
        (0003, 'Sales'),
        (0004, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES  (1001, 'Account Manager', 160000, 0001),
        (2001, 'Accountant', 125000, 0001),
        (1002, 'Lead Engineer', 150000, 0002),
        (2002, 'Junior Engineering', 120000, 0002),
        (3002, 'Lead Software Developer', 155000, 0002),
        (4002, 'Junior Software Developer', 125000, 0002),
        (1003, 'Sales Lead', 140000, 0003),
        (2003, 'Sales Person', 100000, 0003),
        (1004, 'Legal Team Lead', 250000, 0004),
        (2004, 'Lawyer', 190000, 0004);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1011, 'Ashley', 'Benson', 1001, NULL),
        (2011, 'Gary', 'Ciello', 2001, 1011),
        (1012, 'Reed', 'Trinity', 1002, NULL),
        (2012, 'Andrew', 'Tilstock', 2002, 1012),
        (3012, 'Sally', 'Weston', 3002, NULL),
        (4012, 'Jesse', 'Spruce', 4002, 3012),
        (1013, 'Manford', 'Peters', 1003, NULL),
        (2013, 'Grayson', 'Fields', 2003, 1013),
        (1014, 'Stella', 'Heinz', 1004, NULL),
        (2014, 'Allan', 'Gripton', 2004, 1014);

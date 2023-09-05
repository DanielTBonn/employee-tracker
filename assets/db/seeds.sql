INSERT INTO department (name)
VALUES  ('Finance'),
        ('Engineering'),
        ('Sales'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Account Manager', 160000, 1),
        ('Accountant', 125000, 1),
        ('Lead Engineer', 150000, 2),
        ('Junior Engineer', 120000, 2),
        ('Lead Software Developer', 155000, 2),
        ('Junior Software Developer', 125000, 2),
        ('Sales Lead', 140000, 3),
        ('Sales Person', 100000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Ashley', 'Benson', 100, NULL),
        ('Gary', 'Ciello', 101, 1000),
        ('Reed', 'Trinity', 102, NULL),
        ('Andrew', 'Tilstock', 103, 1002),
        ('Sally', 'Weston', 104, NULL),
        ('Jesse', 'Spruce', 105, 1004),
        ('Manford', 'Peters', 106, NULL),
        ('Grayson', 'Fields', 107, 1006),
        ('Stella', 'Heinz', 108, NULL),
        ('Allan', 'Gripton', 109, 1008);

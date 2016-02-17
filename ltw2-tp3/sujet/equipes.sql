create table equipes (
   equipe_id varchar(16) NOT NULL PRIMARY KEY, 
   championnat varchar(32),
   sexe char(1),
   coach varchar(32),
   photo_c varchar(32),
   photo_e varchar(32),
   url_res varchar(200),
   url_classmnt varchar(200),
   CHECK (sexe IN ('M', 'F'))
 );

insert into equipes values (
  'u18',
  'Promotion d''excellence',
  'M',
  'Chris',
  'chris.jpg',
  'u18Small.jpg',
  'http://isere.fff.fr/competitions/php/championnat/championnat_resultat.php?sa_no=2012&cp_no=284409&ph_no=1&gp_no=1',
  'http://isere.fff.fr/competitions/php/championnat/championnat_classement.php?sa_no=2012&cp_no=284409&ph_no=1&gp_no=1'
);

insert into equipes values (
  'SENIORS1',
  'Seniors Promotion d''excellence',
  'M',
  'Gerard',
  'gerard.jpg',
  'seniors1.png',
  'http://isere.fff.fr/competitions/php/championnat/championnat_resultat.php?sa_no=2012&cp_no=284397&ph_no=1&gp_no=1',
  'http://isere.fff.fr/competitions/php/championnat/championnat_classement.php?sa_no=2012&cp_no=284397&ph_no=1&gp_no=1'
);

insert into equipes values (
  'U13-1',
  'A9 Excellence',
  'M',
  'Gilles',
  'Gilles.jpg',
  'u13_1.jpg',
  'http://isere.fff.fr/competitions/php/championnat/championnat_resultat.php?sa_no=2012&cp_no=284427&ph_no=1&gp_no=1',
  'http://isere.fff.fr/competitions/php/championnat/championnat_classement.php?sa_no=2012&cp_no=284427&ph_no=1&gp_no=1'
);

insert into equipes values (
  'U13-2',
  'A9 Promotion d''excellence',
  'M',
  'Olivier',
  'olivier.jpg',
  'u13_2.jpg',
  'http://isere.fff.fr/competitions/php/championnat/championnat_resultat.php?sa_no=2012&cp_no=284428&ph_no=1&gp_no=1',
  'http://isere.fff.fr/competitions/php/championnat/championnat_classement.php?sa_no=2012&cp_no=284428&ph_no=1&gp_no=1'
);

insert into equipes values (
  'Seniors',
  'Feminines a 11 Seniors',
  'F',
  'Sandra',
  'sandra.jpg',
  'seniors_F.jpg',
  'http://isere.fff.fr/competitions/php/championnat/championnat_resultat.php?sa_no=2012&cp_no=284438&ph_no=1&gp_no=1',
  'http://isere.fff.fr/competitions/php/championnat/championnat_classement.php?sa_no=2012&cp_no=284438&ph_no=1&gp_no=1'
);

insert into equipes values (
  'U18F',
  'Feminines a 7 U18',
  'F',
  'Marion',
  'marion.jpg',
  'u18_F.jpg',
  'http://isere.fff.fr/competitions/php/championnat/championnat_resultat.php?cp_no=284440&ph_no=1&sa_no=2012',
  'http://isere.fff.fr/competitions/php/championnat/championnat_classement.php?sa_no=2012&cp_no=284440&ph_no=1&gp_no='
);

commit;
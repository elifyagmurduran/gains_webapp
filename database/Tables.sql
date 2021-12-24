CREATE TABLE Kategori (
  ID INT NOT NULL,
  KategoriAdı TEXT,
  PRIMARY KEY (ID)
); 

CREATE TABLE Hareket (
  ID INT NOT NULL,
  HareketAdı TEXT,
  Thumbnail TEXT,
  Açıklama TEXT,
  KasID INT,
  KategoriID INT,
  Süre INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (KasID) REFERENCES Kas(ID),
  FOREIGN KEY (KategoriID) REFERENCES Kategori(ID)
);

CREATE TABLE Kas (
  ID INT NOT NULL,
  KasAdı TEXT,
  PRIMARY KEY (ID)
);

CREATE TABLE Rutin (
  ID INT NOT NULL,
  RutinAdı TEXT,
  HareketID INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (HareketID) REFERENCES Hareket(ID)
); 

CREATE TABLE Yetkili (
  ID INT NOT NULL,
  KullanıcıAdı TEXT,
  Şifre TEXT,
  PRIMARY KEY (ID)
);

CREATE TABLE Kullanıcı (
  ID INT NOT NULL,
  ProfilFoto TEXT,
  KullanıcıAdı TEXT,
  Şifre TEXT,
  Yaş INT,
  Kilo DECIMAL,
  Boy DECIMAL,
  Favoriler INT,
  Calendar INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (Favoriler) REFERENCES Rutin(ID),
  FOREIGN KEY (Calendar) REFERENCES Rutin(ID)
);
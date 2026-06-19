package com.mycompany.hu_b.security;

import java.util.List;

/*
 * Modelklasse voor gebruikersgegevens vanuit het Qquest AI Centrum.
 *
 * Deze gegevens worden opgehaald via /api/me en gebruikt om te controleren
 * of een gebruiker is ingelogd en toegang heeft tot HU-B.
 */

public class CentrumUser {
    public String id;
    public String email;
    public String name;
    public List<String> branches;
    public boolean isAdmin;
    public int tokenVersion;
    public List<String> toolGrants;
}
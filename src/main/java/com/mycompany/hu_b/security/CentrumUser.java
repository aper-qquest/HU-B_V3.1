package com.mycompany.hu_b.security;

import java.util.List;

public class CentrumUser {
    public String id;
    public String email;
    public String name;
    public List<String> branches;
    public boolean isAdmin;
    public int tokenVersion;
    public List<String> toolGrants;
}
#!/bin/bash

# chmod u+rwx /scripts/init.template.sql
cp /scripts/init.template.sql /scripts/init.sql

# Escapes the sed replacement metacharacters (`\`, `/` and `&`) in the given value.
escape_sed_replacement() {
    printf '%s' "$1" | sed -e 's/[\\/&]/\\&/g'
}

# Escapes the given value for a single-quoted SQL string literal (`\` and `'`).
escape_sql_string() {
    printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e "s/'/''/g"
}

# Replace environment variables in SQL files with their values
if [ -n "$MYSQL_USER" ]; then
    sed -i "s/{MYSQL_USER}/$(escape_sed_replacement "$(escape_sql_string "$MYSQL_USER")")/g" /scripts/init.sql
fi
if [ -n "$MYSQL_PASSWORD" ]; then
    sed -i "s/{MYSQL_PASSWORD}/$(escape_sed_replacement "$(escape_sql_string "$MYSQL_PASSWORD")")/g" /scripts/init.sql
fi
if [ -n "$MYSQL_DATABASE" ]; then
    sed -i "s/{MYSQL_DATABASE}/$(escape_sed_replacement "$MYSQL_DATABASE")/g" /scripts/init.sql
fi

# Execute SQL file
mysql -u root -p"$MYSQL_ROOT_PASSWORD" < /scripts/init.sql
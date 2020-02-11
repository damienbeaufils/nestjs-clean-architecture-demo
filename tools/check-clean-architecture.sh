#!/usr/bin/env bash

readonly SRC_PATH="src"

readonly DOMAIN_DIRECTORY_PATH="${SRC_PATH}/domain"
readonly USE_CASES_DIRECTORY_PATH="${SRC_PATH}/use_cases"

readonly UNAUTHORIZED_IMPORTS_IN_USE_CASES="infrastructure|nestjs"
readonly UNAUTHORIZED_IMPORTS_IN_DOMAIN="${UNAUTHORIZED_IMPORTS_IN_USE_CASES}|use_cases"

readonly UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN=$(find ${DOMAIN_DIRECTORY_PATH} -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS_IN_DOMAIN} {} \; | wc -l)
readonly UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES=$(find ${USE_CASES_DIRECTORY_PATH} -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS_IN_USE_CASES} {} \; | wc -l)

if [[ "${UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN}" -eq 0 ]] && [[ "${UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES}" -eq 0 ]]; then
  exit 0
fi

echo "${UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN} unauthorized imports in ${DOMAIN_DIRECTORY_PATH}:"
find ${DOMAIN_DIRECTORY_PATH} -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS_IN_DOMAIN} {} \;
echo ""
echo "${UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES} unauthorized imports in ${USE_CASES_DIRECTORY_PATH}:"
find ${USE_CASES_DIRECTORY_PATH} -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS_IN_USE_CASES} {} \;
exit 1

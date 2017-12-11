cmake_minimum_required(VERSION 2.6)

PROJECT(vuci-rpc-base C)

ADD_DEFINITIONS(-Os -Wall -Werror --std=gnu99 -g3 -Wmissing-declarations)

SET(CMAKE_SHARED_LIBRARY_LINK_C_FLAGS "")

IF(APPLE)
  INCLUDE_DIRECTORIES(/opt/local/include)
  LINK_DIRECTORIES(/opt/local/lib)
ENDIF()

FIND_LIBRARY(crypt NAMES crypt)
IF(crypt STREQUAL "LIBS-NOTFOUND")
  SET(crypt "")
ENDIF()

ADD_LIBRARY(vuci-rpc-base MODULE vuci.c)
TARGET_LINK_LIBRARIES(vuci-rpc-base ubox ubus ${crypt})
SET_TARGET_PROPERTIES(vuci-rpc-base PROPERTIES OUTPUT_NAME vuci PREFIX "")

INSTALL(TARGETS vuci-rpc-base LIBRARY DESTINATION lib)

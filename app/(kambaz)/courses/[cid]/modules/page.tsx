"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateModule, editModule, setModulesForCourse } from "./reducer";
import { RootState } from "../../../store";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import * as coursesClient from "../../client";

const EDITABLE_ROLES = ["FACULTY", "ADMIN", "TA"];

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const dispatch = useDispatch();
  const canEdit =
    currentUser && EDITABLE_ROLES.includes((currentUser as any).role);

  const courseId = cid as string;

  const loadModules = async () => {
    const list = await coursesClient.findModulesForCourse(courseId);
    dispatch(setModulesForCourse({ courseId, modules: list }));
  };

  useEffect(() => {
    if (!courseId) return;
    let cancelled = false;
    (async () => {
      try {
        const list = await coursesClient.findModulesForCourse(courseId);
        if (!cancelled) {
          dispatch(setModulesForCourse({ courseId, modules: list }));
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId, dispatch]);

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={async () => {
          if (!moduleName.trim()) return;
          await coursesClient.createModuleForCourse(courseId, {
            name: moduleName,
          });
          await loadModules();
          setModuleName("");
        }}
        canEdit={canEdit}
      />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!canEdit && module.name}
                {canEdit && !module.editing && module.name}
                {canEdit && module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value }),
                      )
                    }
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        const name = (e.target as HTMLInputElement).value;
                        const { editing: _e, ...rest } = module;
                        await coursesClient.updateModuleApi(courseId, {
                          ...rest,
                          name: name || module.name,
                        });
                        dispatch(
                          updateModule({ ...module, name, editing: false }),
                        );
                        await loadModules();
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                {canEdit && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={async (moduleId) => {
                      await coursesClient.deleteModuleApi(courseId, moduleId);
                      await loadModules();
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id ?? lesson.name}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
